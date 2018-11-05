import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-tweek';
import { createTweekClient, watchVersion } from 'tweek-client';
import TweekLocalCache from 'tweek-local-cache';
import ThemeProvider from './ThemeProvider';
import App from './App';
import './index.css';

const env = window.location.pathname.replace('/','');

if(!env) {
  alert('Please provide env.');
}

const baseServiceUrl = `https://api.${env}.configz.io`;

function createTweekRepo() {
  const tweekClient = createTweekClient({ baseServiceUrl });
  const tweekRepo = new TweekLocalCache({ client: tweekClient });

  tweekRepo.context = {
    user: {
      id: "john"
    }
  };


  setInterval(() => tweekRepo.refresh(), 1000);

  return tweekRepo;
}

ReactDOM.render(
  <Provider repo={createTweekRepo()}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
