import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';

import '../static/css/vendor/tailwind.css'; // PurifyCSS-ed in next.config.js

export default class AppWithRedux extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}
