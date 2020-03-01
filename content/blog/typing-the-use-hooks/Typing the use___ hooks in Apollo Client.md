---
title: Typing the use___ hooks in Apollo Client
date: '2020-02-29T14:45:00.284Z'
description: How can you type check the GraphQL query variables and data response using TypeScript?
---

<img src="https://images.unsplash.com/photo-1561264687-6f0bd08b5931?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt="A London Underground sign at night" style="zoom:80%;" />

Something I don't see people doing that often is using TypeScript to type the GraphQL variables and response data in the `useQuery`, `useMutation` and `useSubscription` hooks [React Apollo provides](https://www.apollographql.com/docs/react/).

It's very straightforward and provides some nice safety and autocomplete. Here's a quick lesson on how to do it with the `useQuery` hook:

Say you are fetching some user data like their *first name*, *last name,* *avatar URL*, etc. It takes a variable `userId` to know whose data to return. The query might look something like this:

```typescript
const GET_USER_BY_ID = gql`
  query getUserById($userId: String!) {
          user(userId: $userId) {
              firstName
              lastName
              avatar {
                url
              }
          }
  }
`
```

So we are expecting to get back an object with a key, `user`, and some sub-properties. It's easy then to create an interface to model this in TypeScript world:

```typescript
interface UserData {
  user: User
}

interface User {
  firstName: string
  lastName: string
  avatar: {
    url: string
  }
}
```

We're now ready to type that `useQuery` hook! It takes a generic with two arguments: the first one being the `data` shape we are expecting back, and the second being any variables our query expects. Thus our completed hook usage could look like this:

```typescript
 const { loading, error, data } = useQuery<UserData, { userId: string }>(GET_USER_BY_ID)
```

Remember, Apollo expects our variables to be key-value pairs in an object. We could also create a variables interface to hold our `userId` variable, but if it's just for a variable or two I tend to do them inline like above.

Try this out in your own React TypeScript Apollo components!


