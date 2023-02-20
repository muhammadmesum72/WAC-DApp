// scroll bar
import 'simplebar/src/simplebar.css';

import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './redux/store';
import './index.css';

// Create a client
const queryClient = new QueryClient();
// ----------------------------------------------------------------------

ReactDOM.render(
   <QueryClientProvider client={queryClient}>
      <Provider store={store}>
         <HelmetProvider>
            <BrowserRouter>
               <SnackbarProvider maxSnack={1}>
                  <App />
               </SnackbarProvider>
            </BrowserRouter>
         </HelmetProvider>

         <ReactQueryDevtools
            initialIsOpen={false}
            position='bottom-right'
         />
      </Provider>
   </QueryClientProvider>,
   document.getElementById('root')
);
