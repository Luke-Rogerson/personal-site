---
title: A better Python logger for AWS Lambda
date: '2021-10-31T14:45:00.284Z'
description: A Python logging setup for AWS Lambda for better readability and `extra` fields
---

<img src="https://miro.medium.com/0*WioFYeOnSYLgDJpY" alt="A stack of chopped-down logs" style="zoom:80%;" />

I think that the default [AWS Lambda function logging in Python](https://lukerogerson.medium.com/AWS Lambda function logging in Python) is not particularly readable, making things like using logs for debugging more challenging.

My two main issues are:

1. **I want to see the logged message first**. Why is the `RequestId` the first thing displayed? I don’t want to have to expand/click into a log to read the message!
2. **The** `**extra**` **field isn't shown at all**. As a Python dev, you've likely made use of this kwarg to [pass further useful key/value attributes with a log](https://docs.python.org/3/library/logging.html#logging.debug). I want to also do the same in my Python Lambda functions!

Presented below is my solution to these problems! It works by sub-classing the `Logger` class and overriding the `makeRecord` method on it. Also surfaced are other helpful attributes such as the module name where the log originated.

Feel free to borrow and make use of this in your own Lambdas!

```python
class LogLevel(Enum):
    CRITICAL = CRITICAL
    DEBUG = DEBUG
    ERROR = ERROR
    FATAL = FATAL
    INFO = INFO
    NOTSET = NOTSET
    WARNING = WARNING


class FormatterJSON(logging.Formatter):
    def format(self, record: LogRecord) -> str:
        record.message = record.getMessage()
        if self.usesTime():
            record.asctime = self.formatTime(record, self.datefmt)
        log_dict = {
            "message": record.message,
            "extra": record.__dict__.get("extra", {}),
            "module": record.module,
            "levelname": record.levelname,
            "time": "%(asctime)s.%(msecs)dZ" % dict(asctime=record.asctime, msecs=record.msecs),
            "aws_request_id": getattr(record, "aws_request_id", "00000000-0000-0000-0000-000000000000"),
        }
        result: str = json.dumps(log_dict, default=lambda value: str(value)) 
        return result + "\n" # the newline char I've found is necesssary in container image Lambas, otherwise multiple logs are grouped together in one CloudWatch row


class CustomLogger(logging.Logger):
    def makeRecord(
        self,
        name: str,
        level: int,
        fn: str,
        lno: int,
        msg: str,
        args: Any,
        exc_info: Union[Tuple[Type[BaseException], BaseException, Optional[Any]], Tuple[None, None, None], None],
        func: Optional[str] = None,
        extra: Optional[Mapping[str, Any]] = None,
        sinfo: Optional[str] = None,
    ) -> LogRecord:
        rv = logging.LogRecord(name, level, fn, lno, msg, args, exc_info, func, sinfo)
        if extra is not None:
            rv.__dict__["extra"] = extra
        return rv


def use_logging(level: LogLevel = LogLevel.INFO) -> logging.Logger:
    custom_logger = logging.getLogger()
    custom_logger.__class__ = CustomLogger
    custom_logger.setLevel(level.value)
    formatter = FormatterJSON("[%(levelname)s]\t%(asctime)s.%(msecs)dZ\t%(levelno)s\t%(x)s\n", "%Y-%m-%dT%H:%M:%S")
    for handler in custom_logger.handlers:
        handler.setFormatter(formatter)
    return custom_logger
```

###  Usage:

```python
logger = use_logging()
logger.info('An informative log message', extra={'user_id': 'abc123', **function_args})
```

Simply instantiate `use_logging` inside of your Lambda function, then the API for logs is the same as what you are useful with the regular Python logger!


<img src="https://i.imgur.com/RujrHWm.png" alt="An example AWS CloudWatch log" style="zoom:80%;" />
