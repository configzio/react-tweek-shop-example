import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-tweek';
import { createTweekClient, watchVersion } from 'tweek-client';
import TweekLocalCache from 'tweek-local-cache';
import ThemeProvider from './ThemeProvider';
import App from './App';
import './index.css';

const params = window.location.pathname.split('/');
const env = params[1]||'test';
const user = params[2]||'john';

const baseServiceUrl = `https://api.${env}.configz.io`;

function createTweekRepo() {
  const tweekClient = createTweekClient({ baseServiceUrl });  
  const tweekRepo = new TweekLocalCache({ client: tweekClient });

  tweekRepo.context = {
    user: {
      id: user
    }
  };
  
  let currentInterval = 1000;
  let refreshKeysInterval = setInterval(() => tweekRepo.refresh(), currentInterval);

  tweekRepo.observe('shop/refresh_interval').subscribe(interval=>{
    if(!interval.hasValue || interval.value === currentInterval) return;

    currentInterval = interval.value;
    clearInterval(refreshKeysInterval);
    refreshKeysInterval = setInterval(() => tweekRepo.refresh(), currentInterval);
  });

  return tweekRepo;
}

ReactDOM.render(
  <Provider repo={createTweekRepo()}>
    <ThemeProvider>
      <App userName={user}/>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
