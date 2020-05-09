---
title: Building Shoppit - structuring the redux state (pt. 1)
date: '2018-12-09'
description: A look how I managed global state in my Shoppit app
---

For the past sometime I've been working in a team to build Shoppit - a social shopping iOS app that shows you cool, curated items based on your likes, lets you follow friends and notifies you of their birthdays.

As it's designed to be a mobile app, I've been building it using React Native and Redux. It's been incredible both getting hands-on with React Native and building a real mobile app.

In previous projects, I've basically added properties on the go as they were needed. This got the job done, but often lead to huge, cumbersome Redux setups that caused a lot of headaches. This time I wanted to organise it better from the start.

The basic idea is to have an *entities* and a *pages* reducer:

```javascript
const reducers = combineReducers({ entities, pages })
```

The *entities* property essentially acts as a local database of everything that's been provided by the backend. The state is separated into different groups. As our data has been normalised, this means that these groups aren't arrays, but rather objects with keys relating to every entity. Data is not repeated, but referenced, kind of like a mini relational database.

An example of how the entities part of the Shoppit Redux store looked

As a result of this format, the *entities* reducer can be quite simple:

```javascript
const entities = (state = defaultState, action) => {
  if (!action.data || !action.data.entities) return state;

  const entities = action.data.entities;

  return {
    ...state,
    currentUser: {
      ...state.currentUser,
      ...entities.currentUser
    },
    friends: {
      ...state.friends,
      ...entities.friends
    },
    categories: {
      ...state.categories,
      ...entities.categories
    },
...

```

**One thing to note** is that this is really just adding or overwriting data as it arrives. There's no case for deleting data.

If you want to see a really good example of this way of structuring your own Redux state, Redux's own [Real World Example](https://github.com/reduxjs/redux/tree/master/examples/real-world) is a great place to start!

Next, I will talk about how I structured that other reducer I mentioned up top: the *pages* reducer!
