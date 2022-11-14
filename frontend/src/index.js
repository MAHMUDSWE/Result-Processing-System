import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import axios from 'axios'

axios.interceptors.request.use(req => {
    req.headers.author = "mahmud";
    req.headers.authorization = `Bearer ${localStorage.getItem("access_token")}`;
    return req;
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);