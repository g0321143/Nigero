import ReactDOM from 'react-dom'
import React from 'react'

import App from './App'
import GlobalStyles from './Utils/GlobalStyles';

ReactDOM.render(
    <>
        <GlobalStyles />
        <App />
    </>,
    document.getElementById('root')
);
