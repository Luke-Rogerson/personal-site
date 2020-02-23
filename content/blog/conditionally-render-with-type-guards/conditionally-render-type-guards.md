---
title: Conditionally render a React component with TypeScript type guards
date: '2020-02-22T14:45:00.284Z'
description: It's easy to type a component to accept different props
---

<img src="https://images.unsplash.com/photo-1529982971869-586342d344b8?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1500&amp;q=80" alt="A Highland Cow" style="zoom:80%;" />

Building [my website](/), I wanted to have an `<Icon />` component that showed an icon image and **either** navigated somewhere internally **or** linked to an external website.

For this to work, my `<Icon />` component needs to return a [Gatsby Link component](https://www.gatsbyjs.org/docs/gatsby-link/) for internal navigation, or an `<a>` tag for outside websites. This can be accomplished nicely (and safely!) in TypeScript.

The first thing we can do is define our component base props. In my case my `<Icon />` component will always have a name for accessibility:

```typescript
type BaseIconProps = {
  name: string
}
```

Next, we're going to create two types that intersect our base props, one for the **Link** props and one for the **a** props. Notice that we are explictly typing the `to` and `href` properties as `undefined` to ensure we cannot have an `<Icon>` component with both of these props together:

```typescript
type InternalLinkIcon = BaseIconProps &
  GatsbyLinkProps<unknown> & {
    to: string
    href?: undefined
  }

type ExternalLinkIcon = BaseIconProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    to?: undefined
  }
```

**Note:** `GatsbyLinkProps` accepts a generic `<TState>` which is meant to pass state data to the linked page. I don't fully understand why it's necessary or what exactly I should be doing with it, so for now I've just typed it as `unknown`.

We create our component props, which is a union of our _Link_ and _a_ tag props:

```typescript
type IconProps = InternalLinkIcon | ExternalLinkIcon
```

We then have a "guard" function to check if `to` exists in our props. We want to tell TypeScript that if it's there, it's the `InternalLinkIcon` (ie. _Link_) props, otherwise it's the `ExternalLinkIcon` (ie. _a tag_) props.

All that's left for us to do is to pass our `<Icon />` props to this function within our component, so that we can conditionally render the kind we want based only on the props!

```typescript
const Icon: React.FC<IconProps> = props => {
  if (isPropsForGatsbyLink(props)) {
    // ... return a Gatsby Link
  }
  // otherwise, return an anchor tag
}
```

TypeScript will complain if you try to render an `<Icon />` with both the `to` and `href` props.

And that's all there is to it! I hope this gave you some ideas for your own React TypeScript projects! Using type guards in this way is a good alternative to declaring properties as optional when they are only needed in certain use cases of your component!

You can see the full source code for my `<Icon />` component [here](https://github.com/Luke-Rogerson/personal-site/blob/master/src/components/Icon.tsx).

[This is a good read](https://basarat.gitbook.io/typescript/type-system/typeguard) if you'd like to learn more about type guards!
