
import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import explorerSlice from './slice/explorer';
import tabSlice from './slice/myWapes';
import web3Slice from './slice/web3';
import rentingSlice from './slice/renting';

const middleware = (getDefaultMiddleware) => {
    const loggers = [
        ...getDefaultMiddleware({
            serializableCheck: false,
            // serializableCheck: {
            //    // Ignore these action types
            //    ignoredActions: ['web3/changeProvider'],
            // },
        })
    ];

    if (import.meta.env.DEV) {
        // loggers.push(logger);
    }

    return loggers;
};

export const store = configureStore({
    reducer: {
        web3Slice,
        tabSlice,
        explorerSlice,
        rentingSlice,
    },
    // preloadedState: {},
    middleware: (getDefaultMiddleware) => middleware(getDefaultMiddleware),
    // devTools: process.env.NODE_ENV !== 'production',
    devTools: import.meta.env.DEV, // https://vitejs.dev/guide/env-and-mode.html
});
