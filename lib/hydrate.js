import walkTree from 'react-tree-walker';

const hydrateStore = (app) => (
  new Promise(async (resolve, reject) => {
    const actions = [];

    try {
      await walkTree(app, (element, instance) => {
        if (instance && instance.componentWillDispatch) {
          actions.push(instance.componentWillDispatch());
        }
      });
      await Promise.all(actions);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
);

export default hydrateStore;
