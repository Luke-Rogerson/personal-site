---
title: Building Shoppit - structuring the redux state (pt. 2)
date: '2019-01-03'
description: Part two of a detailed look how I structured my global state in the shoppit app
---

For a while now I have been working as part of a team of four to build a social shopping iOS app that shows you cool, curated items based on your likes, lets you follow friends and notifies you of their birthdays.

This is the second of two posts talking about how I set up and structured the state needed by the app using Redux. The last post [outlined the entities reducer](http://www.lukerogerson.me/blog/building-shoppit-structuring-redux-state-part-1/).

As I said, the state is controlled by different reducers:

```javascript
const reducers = combineReducers({ entities, pages })
```

The *entities* property acts almost like a frontend, relational database. State is organised into different entity groups as objects, with keys related to IDs of items, categories or users.

The problem with this setup is that we don't have arrays, so no order. That's where the *pages* reducer comes in! When we normalised our data earlier, we lost the order the data arrived in. Fortunately, *normalizr* also gives us the `results`, which are relations of IDs that represent the fetched data.

Our *pages* reducer is going to make use of this! The *pages* reducer is intended to handle all the local data that different pages and components need in order to show and render information, like arrays of elements and loading flags (for example: to show a loading spinner when fetching new items).

When we map state to props in the containers, we create an array that maps all elements in `state.pages.categoriesPage.categories` to the proper data in *entities*:

```javascript
const mapStateToProps = state => ({
  categories: state.pages.categoriesPage.categories.map(
    category_id => state.entities.categories[category_id]
  ),
})
```

You should then break-up again your `pages` into sets of all pages showing in your app.

To wrap-up: structuring your Redux in this way allows you to organise your state well, follows the Redux "single source of truth" idea, and will allow you to scale your app easily. What I mean by this is if you want to add different entities, you can do this without bothering the *pages* structure. If you want to add another screen or component that uses the data in a different way, you can do this without modifying your central data source.

I'm going to try and use this way of structuring my state more in the future! Give it a try yourself, too!
