---
title: Setting up TypeScript, eslint and prettier in a new JavaScript project
date: '2020-06-22'
description: Stop spending so much time on config in every project
---

<img src="https://images.unsplash.com/photo-1470087167738-6aa485ff65dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="A tea farm in China" style="zoom:80%;" />

**_TL;DR:_** _run [this Makefile](https://gist.github.com/Luke-Rogerson/64cfaa5305074b8bbc766ce06a4ba8dc) in the root of your new JavaScript project to automate setting up TypeScript, eslint and prettier._

When starting a new JavaScript project, I often find myself spending too much time setting up TypeScript, eslint and prettier to my liking. I've decided once and for all to document and automate the whole process. I don't want to ever again spend more than 5 minutes setting up something that is the same for every project!

Follow the steps below (or run the above Makefile) if you too are sick of config!

1. `yarn add typescript -D`
2. `npx tsconfig.json` ([courtesy of Ben Awad](https://github.com/benawad/tsconfig.json))
3. `yarn add eslint prettier eslint-config-airbnb-typescript-prettier -D`
4. In root of project, add `.eslintrc.js`:

```javascript
module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    // just say "no" to default exports!
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
  },
}
```

5. Add `.prettierrc.js`:

```javascript
module.exports = {
  trailingComma: 'es5',
  tabWidth: 4,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  printWidth: 120,
  endOfLine: 'lf',
}
```
