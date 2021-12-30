import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];

/**
 * This function accepts the app state, and saves it to localStorage
 * @param state
 */
const saveState = (state) => {
    try {
        // Convert the state to a JSON string
        const serialisedState = JSON.stringify(state);

        // Save the serialised state to localStorage against the key 'app_state'
        window.localStorage.setItem('app_state', serialisedState);
    } catch (err) {

    }
};

/**
 * This function checks if the app state is saved in localStorage
 */
const loadState = () => {
    try {
        // Load the data saved in localStorage, against the key 'app_state'
        const serialisedState = window.localStorage.getItem('app_state');

        if (!serialisedState) return undefined;
        return JSON.parse(serialisedState);
    } catch (err) {
        return undefined;
    }
};

/**
 * This is where you create the app store
 */
const oldState = loadState();

const store = createStore(
  rootReducer,
  oldState,
  composeWithDevTools(applyMiddleware(...middleware))
);

/**
 * Add a change listener to the store, and invoke our saveState function defined above.
 */
store.subscribe(() => {
    saveState(store.getState());
});

export default store;
