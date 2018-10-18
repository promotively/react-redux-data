# react-redux-data

```react-redux-data``` is a universal/isomporphic higher order (HOC) React component that manages your data dependencies through Redux.

This package has three main goals.

1) Keep your data logic with your components.
2) Support for universal/isomorphic applications.
3) Reduce the amount of repetitive redux code needed to fetch and reset data.

This library will work with any react/redux based application (```react-router``` with ```react-router-config``` is not required!)

## Installation

With Yarn

`yarn add react-redux-data`

With NPM

`npm install react-redux-data`

## Simple Usage

Add ```dataReducer``` to your redux store and make sure that ```redux-thunk``` is also installed.

```javascript
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { dataReducer } from 'react-redux-data';

const store = createStore(
  combineReducers({ data: dataReducer }),
  applyMiddleware(...[ thunk ])
)
```

Wrap your component using the ```withData``` higher order component and specify a key for your data and a function that returns a promise.

```javascript
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withData } from 'react-redux-data';

const ListUsers = () => (
  <h1>List Users</h1>
);

const fetchUsers = () => fetch('api/v1/users');

export default compose(
  connect(),
  withData('users', fetchUsers)
)(ListUsers);
```

Use createDataSelector with ```react-redux``` mapStateToProps to inject data into your component

```javascript
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createDataSelector, withData } from 'react-redux-data';

const mapStateToProps = (state, props) => {
  const dataSelector = createDataSelector('users');

  return {
    users: dataSelector(state, props)
  };
}

const ListUsers = (props) => (
  <div>
    <h1>List Users</h1>
    <ul>
      {props.users.map(user =>
        <li>{user.name}</li>
      )}
    </ul>
  </div>
);

const fetchUsers = () => (
  fetch('/api/v1/users')
);

export default compose(
  connect(mapStateToProps),
  withData('users', fetchUsers)
)(ListUsers);
```

## Advanced Usage

### Server Side Data Fetching (With Promises)

Use hydrateStore to ensure data is fetched before rendering your component.

```javascript
import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { hydrateStore } from 'react-redux-data';
import createStore from './store';
import ListUsers from './list-users';

const server = express();
const store = createStore();
const app = (
  <Provider store={store}>
    <ListUsers />
  </Provider>
);

app.get('/', async (req, res, error) => {
  hydrateStore(jsx)
    .then(() => {
      res.send(renderToString(jsx))
     })
    .catch((e) => {
      console.error(e)
    });
}

server.listen(3000, () => console.log(`Example app listening on port 3000!`))
```

### Server Side Data Fetching (With Async/Await)

Use hydrateStore to ensure data is fetched before rendering your component.

```javascript
import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { hydrateStore } from 'react-redux-data';
import createStore from './store';
import ListUsers from './list-users';

const server = express();
const store = createStore();
const app = (
  <Provider store={store}>
    <ListUsers />
  </Provider>
);

app.get('/', async (req, res, error) => {
  try {
    await hydrateStore(app);
    res.send(renderToString(app));
  } catch (error) {
    next(error);
  }
}

server.listen(3000, () => console.log(`Example app listening on port 3000!`))
```

### Data Mapping

Pass in a mapping function to the ```withData``` higher order component to change what gets saved into the redux store.

```javascript
import React from 'react';
import { compose } from 'redux';
import { connect as withRedux } from 'react-redux';
import { createDataSelector, withData } from 'react-redux-data';

const mapStateToProps = (state, props) => {
  const dataSelector = createDataSelector('users');

  return {
    users: dataSelector(state, props)
  };
}

const mapUsers = (users) => (
  users.filter((user) => user.age > 18)
);

const ListUsers = (props) => (
  <div>
    <h1>List Users</h1>
    <ul>
      {props.users.map(user =>
        <li>{user.name}</li>
      )}
    </ul>
  </div>
);

const fetchUsers = () => (
  fetch('/api/v1/users')
);

export default compose(
  withRedux(mapStateToProps),
  withData('users', fetchUsers, mapUsers)
)(ListUsers);
```

### Loading State

Use createDataLoadingSelector with ```react-redux``` mapStateToProps to display a loading indicator

```javascript
import React from 'react';
import { compose } from 'redux';
import { connect as withRedux } from 'react-redux';
import { createDataSelector, createDataLoadingSelector, withData } from 'react-redux-data';

const mapStateToProps = (state, props) => {
  const dataSelector = createDataSelector('users');
  const dataLoadingSelector = createDataLoadingSelector('users');

  return {
    users: dataSelector(state, props)
    loading: dataLoadingSelector(state, props)
  };
}

const ListUsers = (props) => (
  <div>
    <h1>List Users</h1>
    {loading ?
      <span>Loading, Please Wait...</span>
    :
      <ul>
        {props.users.map(user =>
          <li>{user.name}</li>
        )}
      </ul>
    }
  </div>
);

const fetchUsers = () => (
  fetch('/api/v1/users')
);

export default compose(
  withRedux(mapStateToProps),
  withData('users', fetchUsers)
)(ListUsers)
```

### Error State

Use createDataErrorSelector with ```react-redux``` mapStateToProps to display any errors

```javascript
import React from 'react';
import { compose } from 'redux';
import { connect as withRedux } from 'react-redux';
import { createDataSelector, createDataLoadingSelector, createDataErrorSelector, withData } from 'react-redux-data';

const mapStateToProps = (state, props) => {
  const dataSelector = createDataSelector('users');
  const dataLoadingSelector = createDataLoadingSelector('users');
  const dataErrorSelector = createDataErrorSelector('users');

  return {
    users: dataSelector(state, props)
    loading: dataLoadingSelector(state, props),
    error: dataErrorSelector(state, props)
  };
}

const ListUsers = (props) => (
  <div>
    <h1>List Users</h1>
    {loading ?
      <span>Loading, Please Wait...</span>
    : null}
    {error ?
      <span>Error: {error}</span>
    : null}
    {!loading && !error ?
      <ul>
        {props.users.map(user =>
          <li>{user.name}</li>
        )}
      </ul>
    : null}
  </div>
);

const fetchUsers = () => (
  fetch('/api/v1/users')
);

export default compose(
  withRedux(mapStateToProps),
  withData('users', fetchUsers)
)(ListUsers)
```

## License
MIT