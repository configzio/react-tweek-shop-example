import React from 'react';
import ReactDOM from 'react-dom';
import {TweekProvider} from './utils/Tweek';
import ThemeProvider from './ThemeProvider';
import App from './App';
import './index.css';

const params = window.location.pathname.split('/');
const user = params[2]||'john';

ReactDOM.render(
  <TweekProvider>
    <ThemeProvider>
      <App userName={user}/>
    </ThemeProvider>
  </TweekProvider>,
  document.getElementById('root'),
);
