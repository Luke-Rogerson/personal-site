---
title: Running and debugging Serverless Framework Python Lambda functions locally in VSCode
date: '2021-07-27T14:45:00.284Z'
description: How to debug and step-through Python Lambda functions managed by Serverless Framework in VSCode.
---

<img src="https://cdn-images-1.medium.com/max/1200/1*bLLd0QNFNRzQFPJjLGbNIw.png" alt="A screenshot of VSCode's debugger" style="zoom:80%;" />

For serverless development, I believe you need to have the ability to run and debug individual functions locally. 

Serverless Framework has a useful feature for doing just that: [the invoke local command](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/).

The issue I have found is while it works for Node.js functions, I have never been able to get `serverless invoke local` working with [VSCode’s excellent Python debugging tools](https://code.visualstudio.com/docs/python/debugging).

There are some [great](https://hackernoon.com/running-and-debugging-aws-lambda-functions-locally-with-the-serverless-framework-and-vs-code-a254e2011010) [guides](https://www.youtube.com/watch?v=xaBAZm2jfXQ) available for setting up VSCode to debug Node.js Lambda functions managed by Serverless Framework, but I have not seen many for Python, possibly due to the faff of creating a debugging setup that uses a Node.js script to invoke a Python runtime.

This guide explains how I run and debug my Python Lambda functions locally. My solution makes use of [AWS SAM](https://aws.amazon.com/serverless/sam/) and the [AWS Toolkit for VSCode](https://aws.amazon.com/visualstudiocode/).

Why not just use AWS SAM in place of Serverless Framework (*SF*) then, I hear some of you asking? Well, for one, I use *SF* at my work. *SF* has grown on me,  too. It’s a mature, battle tested platform at this point, and its plugin ecosystem provides all sorts of extra functionality for many different use cases not explicitly supported out the box. I am able to leverage the best parts of *SF* and AWS SAM together.

This setup allows me to do proper local step-through debugging of my Lambda functions by setting breakpoints, inspecting variables, and executing function code one line at a time, while still communicating with real, deployed AWS resource - just as the function would do in a real invocation.

---

### Prerequisites

I am assuming you have [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/) already installed, you use it to manage and deploy Python Lambda functions to AWS, and you use VSCode with [the Python extension](http://marketplace.visualstudio.com/items?itemName=ms-python.python).

### Steps

1. Install the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
2. Install the [AWS Toolkit for VSCode](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/setup-toolkit.html).
3. Add [this launch profile](https://gist.github.com/Luke-Rogerson/c6b12de65cec7af346d1c68444671cd6) to your `.vscode/launch.json`.
4. [Run and debug](https://code.visualstudio.com/docs/editor/debugging#_start-debugging) as normal! [Further config can be found here](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/serverless-apps-run-debug-config-ref.html).

### **A few things to note**

- AWS Toolkit expects a `requirements.txt` [in your workspace folder](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/serverless-apps-run-debug-no-template.html). I use [Poetry](https://python-poetry.org/) to manage my project dependencies, so [I have a `preLaunchTask`](https://gist.github.com/Luke-Rogerson/81d5c4744b6fafdcbdaee66f348e0b65) that generates one automatically before debugging. You can even add a `postDebugTask` . [Read more about VSCode *tasks* here](https://code.visualstudio.com/docs/editor/tasks).

- I use [named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) when interacting with the AWS CLI, which you specify in the `aws` field.
- Function `environmentVariables` and `payload` s can also easily be customised.
- You can pass additional runtime debug arguments [this way](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-debugging-additional-arguments.html).

**That should be all you need to get started!** 👟

---

*Any feedback? Do you know of way to get* `sls invoke local` *playing nice with Python and VSCode’s debugging? Or just an alternative solution? Let me know!*
