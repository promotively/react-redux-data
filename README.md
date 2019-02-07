# @promotively/react-redux-data

Universal react.js/redux.js library for data fetching.

## Why?

* You are already using redux.js in your app.
* You want an easy way to handle data fetching.
* You are building a new app and want to use redux.js to handle your data state.
* You have a bunch of repetitive data related react.js/redux.js boilerplate you wish didn't exist.
* You want a proper data abstraction layer but don't have the time to build one.
* You want to be able to debug your data through redux dev tools.
* You need a library that is compatible with server side rendering.
* You need to interact with APIs that are not HTTP and/or JSON based.
* You want to refresh your data periodically through timers or events.
* You need access to your component props when fetching data for things like access tokens or configs.
* You need to share your data with external applications and/or tools.

## Installation

With Yarn

`yarn add @promotively/react-redux-data`

With NPM

`npm install @promotively/react-redux-data`

## Example

A working example is available inside the ```/example``` folder.

Once you have performed ```yarn build``` go to the ```dist/example``` folder and from there you can run ```node server.js``` to see server side rendering from ```localhost:3000``` or open the ```index.html``` file to see client side rendering.

## Setup

Add ```dataReducer``` to your redux.js store and make sure that ```redux-thunk``` is also added to your store middleware.

```javascript
// store.js

import { applyMiddleware, combineReducers, createStore } from 'redux';
import { dataReducer } from '@promotively/react-redux-data';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({ data: dataReducer }),
  applyMiddleware(...[ thunk ])
);

export default store;
```

## Basic Usage

Wrap your component using ```withData``` and specify a unique identifier for your data and a function that returns a promise.

```javascript
// containers/users.js

import { withData } from '@promotively/react-redux-data';
import axios from 'axios';
import Users from '../components/users';

const fetchUsers = () => (
  axios.get('http://localhost:3000/api/v1/users').then((response) => (
    response.data
  ))
);

const UsersContainer = withData('users', fetchUsers)(Users);

export default UsersContainer;
```

```javascript
// components/users.js

import React from 'react';

const Users = (props) => (
  <ul>
    {props.error ? <span>Error: {props.error}</span> : null}
    {props.loading ? <span>Loading, Please Wait...</span> : null}
    {props.users ? props.users.map((user) => (
      <li key={user.id}>{user.name}</li>
    )) : null}
  </ul>
);

export default Users;
```

If you need to do server side rendering use ```hydrateStore``` to ensure data is fetched before your app is rendered.

```javascript
// server.js

import UsersContainer from './containers/users';
import express from 'express';
import { hydrateStore } from '../src/index';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import store from './store';

const server = express();

const app = (
  <Provider store={store}>
    <UsersContainer id="users" />
  </Provider>
);

server.get('/', async (req, res, next) => {
  try {
    await hydrateStore(app);

    res.send(renderToString(app));
  } catch (error) {
    next(error);
  }
});

server.listen(3000);
```



## API
### Redux Action Creators

| Function | Arguments | Description |
| --- | --- | --- |
| `errorWithData` | (id, error) | Set an error for data in the store. |
| `clearData` | (id) | Clear data from the store. |
| `fetchData` | (id, promise) | Resolve a promise and add the result to the store. |

### React Higher Order Component

| Function | Arguments | Description | Props
| --- | --- | --- |
| `withData` | (Component) | Higher order component that handles fetching and clearing data. | { clearData, data, error, errorWithData, fetchData, loading }

### Redux Reducers

| Function | Description |
| --- | --- 
| `dataReducer` | Redux reducer to handle the state mutations during the data fetching lifecycle. |

### React Redux Selectors

| Function | Arguments | Description |
| --- | --- | --- |
| `createDataSelector` | (id) | Get the current data. |
| `createDataErrorSelector` | (id) | Get the error state. |
| `createDataLoadingSelector` | (id) | Get the loading state. |

### Utilities

| Function | Arguments | Description |
| --- | --- | --- |
| `hydrateStore` | (app) | Resolve all promises outside of the react lifecycle (Mainly used for server side rendering). |

## Build

All build artifacts can be found inside the ```/dist/lib``` and ```/dist/example``` folders.

```
yarn build
```

## Tests

This library has 100% unit test code coverage.

Code coverage is available inside the ```dist/coverage``` folder.

```
yarn test
```

## Documentation

The source code is documented using JSDoc syntax.

Documentation is generated using [esdoc](https://github.com/esdoc/esdoc) and is available inside the ```dist/docs``` folder.

```
yarn docs
```

## Linting

This library uses [@promotively/eslint-config](https://www.github.com/promotively/eslint-config) and [@promotively/eslint-config-react](https://www.github.com/promotively/eslint-config-react) for its eslint configuration.

```
yarn lint
```

## Feedback
Feedback is more than welcome via [GitHub](https://www.github.com/promotively) or [Twitter](https://www.twitter.com/promotively).

## License
MIT