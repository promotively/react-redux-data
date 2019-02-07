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
import { hydrate } from 'react-dom';

const state = window.REDUX_INITIAL_STATE;
const store = createReduxStore(state);
const app = createReactApp(store, state);

hydrate(app, document.getElementsByTagName('main')[0]);
