/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

/**
 * @see {@link https://github.com/facebook/react}
 * @see {@link https://github.com/reduxjs/redux}
 * @see {@link https://github.com/ctrlplusb/react-tree-walker}
 * @see {@link https://github.com/formidablelabs/react-ssr-prepass}
 */

import { fetchData } from 'actions/data';
import { renderToStaticMarkup } from 'react-dom/server';

/**
 * Hydrates the redux.js store by rendering the application (unfortunately) and
 * using the object passed into the contect prop of the <DataProvider />
 * component to fetch any data before the application is ready for a second
 * render (with data state).
 * @function
 * @param {Object} app The react.js JSX for your application.
 * @param {Object} store The redux.js store used by your application.
 * @param {Array} data The object that was passed into the context prop of the
 * <DataProvider /> component.
 * @returns {Promise} Promise that fetches all the data found in the
 * application and throws an error if any of them fail.
 * @example
 * ...
 *
 * import { DataProvider, dataReducer, hydrateStore } from '@promotively/react-redux-data';
 *
 * server.get('/', (req, res) => {
 *   const store = createStore(dataReducer);
 *   const data = {};
 *   const app = (
 *     <Provider store={store}>
 *       <DataProvider context={data}>
 *         <App />
 *       </DataProvider>
 *     </Provider>
 *   );
 *
 *   hydrateStore(app, store, data).then(() => (
 *     res.send(React.renderToString(app))
 *   ));
 * });
 *
 * ...
 */
const hydrateStore = (app, store, data) => {
  /*
   * Below is where the double render begins.
   *
   * If anyone has any suggestions on possible solutions besides using the
   * static context provider pattern that does not involve rendering the
   * application twice (excluding using react-tree-walker which has own issues
   * or using react-ssr-prepass which at the time of writing this is
   * experimental) please let us know.
   *
   * In the future with react.js suspense this method of server side rendering
   * where you have to resolve all data dependencies before rendering your
   * application will become redundant anyway and in the meantime the
   * performance implications can be worked around with various different
   * caching strategies.
   */
  renderToStaticMarkup(app);

  const promises = data.map(item => fetchData(item.id, () => item.action(item.props))(store.dispatch));

  return Promise.all(promises)
    .then(result => {
      const response = {};

      for (let index = 0; index < result.length; index += 1) {
        response[data[index].id] = result[index].data;
      }

      return response;
    })
    .catch(error => {
      throw error;
    });
};

export default hydrateStore;
