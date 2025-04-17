import React from 'react';
import ReactDOM from 'react-dom/client';
import WrapComponent from './component/WrapComponent.jsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import viewProduct from './store/viewProduct.js';
import slideCount from './store/slideCount.js';
import address from './store/address.js';
import cart from './store/cart.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import login from './store/login.js';

const queryClient = new QueryClient();

const store = configureStore({
    reducer: {
        viewProduct,
        slideCount,
        address,
        cart,
        login
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <QueryClientProvider  client={queryClient} >
            <WrapComponent />
        </QueryClientProvider>
    </Provider>
);