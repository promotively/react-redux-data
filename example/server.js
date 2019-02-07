/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import createReactApp from './app';
import createReduxStore from './store';
import express from 'express';
import fs from 'fs';
import { hydrateStore } from '../src/index';
import { renderToString } from 'react-dom/server';

const store = createReduxStore();
const app = createReactApp(store);
const server = express();
const bundle = fs.readFileSync(`${process.cwd()}/browser.js`).toString();
const html = fs.readFileSync(`${process.cwd()}/index.html`).toString().replace('./browser.js', 'http://localhost:3000/browser.js').split('<main />');
const header = `${html[0]}<main>`;
const footer = `</main>${html[1]}`;

server.get('/', (req, res) => {
  hydrateStore(app)
    .then(() => {
      const jsx = renderToString(app);
      const state = `<script>window.REDUX_INITIAL_STATE = ${JSON.stringify(store.getState())};</script>`;

      return res.send(`${header}${jsx}${state}${footer}`);
    }).catch((error) => {
      res.error('Internal Server Error');
      throw error;
    });
});

server.get('/api/v1/users', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  res.json({
    users: [{
      age: 23,
      id: 'bhd7s',
      name: 'Jesse James'
    }, {
      age: 17,
      id: 'ui4sm',
      name: 'Joe Bradley'
    }, {
      age: 47,
      id: '3ma9h',
      name: 'John Smith'
    }]
  });
});

server.get('/browser.js', (req, res) => (
  res.send(bundle)
));

server.listen(3000);
