---
title: Two ways to fix the Jest test error "the module factory of `jest.mock()` is not allowed to reference any out-of-scope variables"
date: '2020-09-19T14:45:00.284Z'
description: Learn how to use variables outside the scope of your Jest mock module factory
---

<img src="https://images.unsplash.com/photo-1573549478649-fcb3c81a1045?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="An Oxfordshire canal and lock" style="zoom:80%;" />

Say you have this test:

```typescript
const navigateToProfile = jest.fn()

jest.mock('@react-navigation/native', () => {
  const module = jest.requireActual('@react-navigation/native')
  return {
    ...module,
    useNavigation: {
      navigate: () => ({
        navigate: navigateToProfile,
      }),
    },
  }
})

test('it should navigate to user profile on press', () => {
  const userId = 'abc123'
  const { getByTestId } = render(<ComponentWithMockedNavigator userId={userId} />)
  const userAvatar = getByTestId('avatar')
  fireEvent.press(userAvatar)
  expect(navigateToProfile).toHaveBeenCalledTimes(1)
  expect(navigateToProfile).toHaveBeenCalledWith({ userId })
})
```

**It's not going to work...**

Jest will complain that `the module factory of "jest.mock()" is not allowed to reference any out-of-scope variables`.

### Fix 1

Prepend your `jest.fn()` variable declaration with **mock**. So, in the above example, `navigateToProfile` becomes **mock**NavigateToProfile:

```typ
// prepended with "mock"
const mockNavigateToProfile = jest.fn()

jest.mock('@react-navigation/native', () => {
   // ...the same
})

test('it should navigate to user profile on press', () => {
   // ...the same
})
```

[Understand why variables that start with the word "mock" solves our scoping error](https://jestjs.io/docs/en/es6-class-mocks#calling-jestmockdocsenjest-objectjestmockmodulename-factory-options-with-the-module-factory-parameter)

### Fix 2

Use `jest.doMock()` instead of `jest.mock()`:

```typ
const navigateToProfile = jest.fn()

// notice we're using "doMock" here
jest.doMock('@react-navigation/native', () => {
   // ...the same
})

test('it should navigate to user profile on press', () => {
   // ...the same
})
```

**Note:** if you want to use this method, [there are some additional steps you'll first have to follow](https://jestjs.io/docs/en/jest-object#jestdomockmodulename-factory-options).
