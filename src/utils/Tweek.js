import React, { Component } from 'react';
import { createTweekContext } from 'react-tweek';
import { TweekRepository } from 'tweek-local-cache';
import { createTweekClient } from 'tweek-client';

const params = window.location.pathname.split('/');
const env = params[1]||'check-email'||'test';
const user = params[2]||'john';
export const getGatewayBaseUrl = () => `https://${env}.api.configz.io`;

const config = {
  baseServiceUrl: getGatewayBaseUrl(),
  clientName: 'tweek-editor',
};
export const tweekClient = createTweekClient(config);

export const TweekContext = createTweekContext();

TweekContext.prepare('@tweek/editor/_');

export const withTweekRepository = BaseComponent => props => (
  <TweekContext.Consumer>
    {tweekRepo => <BaseComponent {...props} tweekRepository={tweekRepo} />}
  </TweekContext.Consumer>
);

export const withTweekKeys = TweekContext.withTweekKeys;

const toTweekContext = (username) => ({ user: username });

class Provider extends Component {
  static displayName = 'TweekProvider';
  state = {
    tweekRepository: undefined,
  };

  componentDidMount() {
    this._setRepository(user);
  }

  _setRepository(currentUser) {
    if (!currentUser) {
      return;
    }

    const tweekRepository = new TweekRepository({
      client: tweekClient,
      context: toTweekContext(currentUser),
    });

    let currentInterval = 1000;
    let refreshKeysInterval = setInterval(() => tweekRepository.refresh(), currentInterval);

    tweekRepository.observe('shop/refresh_interval').subscribe(interval=>{
      if(!interval.hasValue || interval.value === currentInterval) return;

      currentInterval = interval.value;
      clearInterval(refreshKeysInterval);
      refreshKeysInterval = setInterval(() => tweekRepository.refresh(), currentInterval);
    });
    
    this.setState({ tweekRepository });
  }

  render() {
    const { tweekRepository } = this.state;
    const { children } = this.props;
    if (!tweekRepository) {
      return children;
    }

    return (
      <TweekContext.Provider value={this.state.tweekRepository}>{children}</TweekContext.Provider>
    );
  }
}

export const TweekProvider = Provider;
