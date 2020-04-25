---
title: Building an Alexa skill in Node.js and TypeScript using AWS Lambda
date: '2020-04-25T20:46:00.284Z'
description: How to get started building an Alexa Skill using Node.js, TypeScript and AWS Lambda
---

<img src="https://images.pexels.com/photos/3061171/pexels-photo-3061171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="A Highland Castle in Scotland" style="zoom:80%;" />
---

## Abstract

I've been meaning to do something with AWS Lambda functions for a while. What better way to explore event-driven architecture than by building an Alexa skill!

Yet I must admit to feeling a bit overwhelmed when I first started this project. There are a lot of resources out there for building Alexa skills using Node.js. However, they differ a lot in quality, and most focus on plain JavaScript. There are far fewer resources for TypeScript, and fewer still Node.js TypeScript boilerplates or starter code for developing Alexa skills.

As such, below are my recommendations and learnings if you too want to build an Alexa skill using Node.js and TypeScript, but are unsure about the process or just feeling plain daunted about where to start!

## Who is this guide for?

I'm assuming that you have previous experience with Node.js and TypeScript, and have at least played around a little with the AWS Management Console, but have never built an Alexa skill before.

## Getting set up and started

1.  Watch [this excellent introduction](https://www.youtube.com/watch?v=BB3wwxgqPOU) to building an Alexa skill using Node.js and JavaScript. It explains things like intents, slots, and how Lambda fits into Alexa "backends" really well.

2. Follow along with making a similar skill as in the video. Like he does, simply create your Alexa frontend at https://developer.amazon.com and the backend Lambda at https://aws.amazon.com/console/. 

   **NOTE!** He uses a tool that his team developed to take in the JSON representation of the various intents and slots you've created in the frontend to generate a Node.js Lambda boilerplate. I actually found this tool didn't work at all and the frontend *Test* tool would always announce it was an invalid response! 

   What I suggest you do is use the *AWS Serverless Application Resposity* **Alexa-skills-kit-nodejs-factskill** template instead that you can select when you create your new Lambda function. For now,  simply have a play around editing the code inline. Don't worry yet about developing on your local machine.

 3.  Now that you have a better idea about what is needed to create a Lambda skill, it's time do things properly and develop your skill locally on your own machine in the comfort of your favourite code editor / IDE. For this, follow the steps [here](https://developer.amazon.com/en-US/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html) to install the *Alexa Skills Kit* (ASK) CLI.

 4.  Run `ask new`, choose *NodeJS*, and *AWS Lambda* for hosting your skill's backend, the "Hello world" template, and give your skill a name and a folder name. This will generate a basic Node.js JavaScript Alexa skill setup. The frontend for your skill lives in the *skill-package* folder, and the backend (unsurprisingly!) in the *lambda* folder. Have a play around and understand how the things we created earlier on the Amazon developer website and in the AWS lambda console relates to the "code" way here.

 5.  It would be nice if the ASK CLI gave us the option to generate a template with TypeScript already set up, but, alas, it doesn't. We need to add that now. The steps I suggest you do are as follows:

      1.  Run `yarn init` in **the root** of your repository to create a new package.json, followed by `yarn` to complete the setup.

      2.  Run `yarn add ask-sdk ask-sdk-core ask-sdk-model ` to add the Alexa dependencies, and `yarn add @types/node typescript -D ` to install TypeScript and Node TS types. Run `npx tsconfig.json` and choose "NodeJS" to generate a good *tsconfig* for us.

      3.  NodeJS requires our TypeScript code to be transpired to CommonJS JavaScript. We can use the TypeScript compiler to do this, as well as it type checking our source code. This has the advantage that we can use modern JS syntax to build our Lambda function, such as ES6 imports and exports. In your *tsconfig.json*, add a `rootDir` key and set it to be our `lambda/src` folder, and update the `outDir` path to be `./dist`. We are telling TypeScript to place all the transpiled JavaScript code in a folder called *dist*. This is the folder we will deploy our Alexa skill from.

      4.  Rename your `index.js` to `.ts`. There's a few things I did immediately here: change the `require(...)` statement to an `import`, and read through [these docs](https://developer.amazon.com/en-US/docs/alexa/alexa-skills-kit-sdk-for-nodejs/develop-your-first-skill.html) to add types. They actually seemed to go overboard with the typing; I found it was generally enough to type `RequestHandler` objects and that meant TypeScript could nicely infer all the method signatures such as `canHandle` and `handle`.

      5.  We will use the ASK CLI to [deploy](https://developer.amazon.com/en-US/docs/alexa/smapi/ask-cli-command-reference.html#deploy-command) our Alexa skill. It's **important to understand** that one of the things the `ask deploy` skill does is essentially running `npm install` to install dependencies declared in our Lambda *package.json*. As we are deploying from our *dist* folder, we need to also copy across the src *package.json* and *utils.js* files. The TypeScript compiler will take care of our .ts files, the simplest way I found to add the other two was to use the `cp` command in conjunction with the `tsc` command. Add the following script to your root package.json *scripts*: `build: tsc && cp lambda/package.json lambda/util.js dist`. Now, you can simply run `yarn build` to package up all the JavaScript code.

      6.  Finally, open the `ask-resources.json` file and find the `code` object. Replace it with:

          ```json
          "code": {
            "default": {
              "src": "./dist"
            }
          ```

          This tells the ASK CLI where it should look for our transpiled JS code that will be pushed to our Lambda function each time 

 6.  The last thing I think you need to change before you can really get stuck in and build whatever amazing Alexa skill idea you have is to add a `deploy` script to our root *package.json*. Simply add `"deploy": "yarn build && ask deploy"`. Now, whenever you want to deploy a new update to your **development** Alexa skill, you simply need to run this command and the TypeScript compiler and ASK CLI will take care of the rest!

 7.  Optionally, I'd definitely recommend you add eslint and Prettier, but I'll leave that to you to figure out!

 8.  Get tinkering and build something cool! In my case, I built a jokes skill that used *super-duper complex algorithms* to tell you hilariously bad jokes! You can see how I did it [here](https://github.com/Luke-Rogerson/bad-jokes)!

## Misc tips and tricks

- Debugging cloud functions can be a pain. The easiest way I found was to add console logs to your code. You can then see the output in **AWS CloudWatch**. To find this, go your Lambda function in the AWS Management Console, click the "Monitoring" tab, open the "View logs in CloudWatch" and click on the latest `Log Stream` . Remember to deploy your skill with the console.logs first!

- The [dialog command](https://developer.amazon.com/en-US/docs/alexa/smapi/ask-cli-command-reference.html#dialog-command) is useful for simulating locally a multi-turn conversation with Alexa. I added a script to my package.json for ease: `"dialog": "ask dialog --locale en-GB"`

- The `interactionModels` folder contains important thing for your skills *frontend*. The `skill.json` is where you customise a lot of the things that a user will see when you publish your skill to the Alexa Skill store, such as example intents. The `interactionModels` is where you define your intents and slots that you previously did on the Amazon developer website.

## Conclusion

I had a lot of fun building my Alexa skill! Hopefully, some of the above is useful to you if you also want to build one using Node.js and TypeScript and helps you avoid some earlier pain points I faced.

I think it's a great way to get into serverless computing and build something really tangible that you can show off to your friends and family.

[Here](https://github.com/Luke-Rogerson/bad-jokes) is the source code for my Alexa skill, including [the commit history](https://github.com/Luke-Rogerson/bad-jokes/commits/master), which you might also find useful and basically goes through the same process as I outlined above! 

*ANNNNDDDDDDD* in case you fancy giving it a spin, [here is my published Alexa skill](https://www.amazon.co.uk/Luke-Rogerson-Lukes-jokes/dp/B087CXFGR3/ref=sr_1_1?dchild=1&keywords=luke's+jokes&qid=1587836317&s=digital-skills&sr=1-1) if you want a laugh!  
