import { combineReducers } from 'redux';
import ui from './ui.js';
import routers from './routers.js';
import { reducer as form } from 'redux-form';
import { setMiddleware, setGithub } from './../actions/saved.js';

const appReducer = combineReducers({
  ui,
  routers,
  form,
});

// This allows us to use top-level reducers
// Thus, we can reset the state to default values
export default (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }

  if (action.type === 'SET_STATE') {
    const config = action.config;

    config.data.routers = config.data.routers.map(router =>
      Object.assign({}, router, {
        validation: {
          startPoint: true,
          name: true,
        },
        editingStartPoint: false,
        editingName: false,
      })
    );

    state = {
      ui: {},
      routers: config.data.routers,
      form: {
        config: {
          _asyncValidating: false,
          _initialized: false,
          _submitting: false,
          _submitFailed: false,
          configName: {
            value: config.appName,
          },
          middleware: setMiddleware(config.data.middleware),
          github: setGithub(config.data.github),
          port: {
            value: config.data.serverSettings.port,
          },
        },
      },
    };
  }

  return appReducer(state, action);
};
