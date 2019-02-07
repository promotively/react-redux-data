/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */


// Temporary fork of react-tree-walker is currently being imported (see: https://www.github.com/promotively/react-tree-walker)
import walkTree from '@promotively/react-tree-walker';

/**
 * Walks the JSX tree and resolves any promises supplied through withData HOCs
 * @function
 * @param {object} app The JSX tree to look for any withData HOCs.
 * @returns {promise} Promise that asychronously resolves all the promises found in the JSX tree and throws an error if any of them fail.
*/
const hydrateStore = (app) => {
  const actions = [];

  return walkTree(app, (element, instance) => {
    if (instance && instance.componentWillDispatch) {
      actions.push(instance.componentWillDispatch());
    }
  }).then(() => (
    Promise.all(actions)
  )).catch((error) => {
    throw error;
  });
};

export default hydrateStore;
