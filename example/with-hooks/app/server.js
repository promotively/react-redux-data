/**
 * promotively/react-redux-data
 *
 * @copyright Promotively (c) 2020
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @license MIT
 *
 * @see {@link https://promotively.com}
 * @see {@link https://github.com/promotively/react-redux-data}
 */

/**
 * @see {@link https://github.com/facebook/react}
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/reduxjs/redux-thunk}
 * @see {@link https://github.com/expressjs/express}
 */

/* eslint-disable no-console */
/* eslint-disable promise/prefer-await-to-then */

import fs from 'fs';
import express from 'express';
import expressWinston from 'express-winston';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider as StoreProvider } from 'react-redux';
import winston from 'winston';
import { DataProvider, hydrateStore } from '../../../src';
import { App } from '../components/app';
import { Layout } from '../../common/components/layout';
import { createReduxStore } from '../../common/helpers/store';
import users from '../../common/data.json';

const store = createReduxStore();
const data = [];
const app = (
  <StoreProvider store={store}>
    <DataProvider context={data}>
      <Layout title="promotively/react-redux-data Example (Using Hooks With Server Side Rendering)">
        <App />
      </Layout>
    </DataProvider>
  </StoreProvider>
);

const server = express();
const directory = process.cwd();
const bundle = fs.readFileSync(`${directory}/browser.js`).toString();
const html = fs
  .readFileSync(`${directory}/index.html`)
  .toString()
  .replace('./browser.js', 'http://localhost:3000/browser.js')
  .split('<main />');
const [header, footer] = html;

server.use(
  expressWinston.logger({
    colorize: true,
    expressFormat: true,
    format: winston.format.combine(winston.format.prettyPrint(), winston.format.simple()),
    meta: false,
    transports: [new winston.transports.Console()]
  })
);

server.get('/', (req, res) => {
  hydrateStore(app, store, data)
    .then(() => {
      const jsx = renderToString(app);
      const state = `<script>window.REDUX_INITIAL_STATE = ${JSON.stringify(store.getState())};</script>`;

      return res.send(`${header}<main>${jsx}</main>${state}${footer}`);
    })
    .catch(error => {
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
    users: search
      ? users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
      : users.sort((previous, next) => previous.id - next.id)
  });
});

server.get('/browser.js', (req, res) => res.send(bundle));

const port = 3000;
server.listen(port);

console.log(`info: Example file://${process.cwd()}/index.html`);
console.log(`info: Example (SSR) http://localhost:${port}/`);
