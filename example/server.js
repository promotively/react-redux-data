/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import { DataProvider, hydrateStore } from '../src';
import App from './components/app';
import createReduxStore from './store';
import express from 'express';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider as StoreProvider } from 'react-redux';
import users from './data.json';

const store = createReduxStore();
const data = [];
const app = (
  <StoreProvider store={store}>
    <DataProvider context={data}>
      <App platform="server" />
    </DataProvider>
  </StoreProvider>
);

const server = express();
const directory = process.cwd();
const bundle = fs.readFileSync(`${directory}/browser.js`).toString();
const html = fs.readFileSync(`${directory}/index.html`).toString().replace('./browser.js', 'http://localhost:3000/browser.js').split('<main />');
const [ header, footer ] = html;

server.get('/', (req, res) => {
  hydrateStore(app, store, data)
    .then(() => {
      const jsx = renderToString(app);
      const state = `<script>window.REDUX_INITIAL_STATE = ${JSON.stringify(store.getState())};</script>`;

      return res.send(`${header}<main>${jsx}</main>${state}${footer}`);
    }).catch((error) => {
      res.error('Internal Server Error');
      throw error;
    });
});

/*
 * This api endpoint isn't used by default however you can enable it by using
 * the axios example provided in the code comments inside: example/containers/users.js
 */
server.get('/api/v1/users', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { search } = req.query;

  res.json({
    users: search ? users.filter(
      (user) => user.name.toLowerCase().includes(search.toLowerCase())
    ) : users.sort(
      (previous, next) => (
        previous.id - next.id
      )
    )
  });
});

server.get('/browser.js', (req, res) => (
  res.send(bundle)
));

server.listen(3000);
