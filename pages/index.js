import React, { Fragment } from 'react';
import Head from 'next/head';
import 'isomorphic-unfetch'; // global fetch required for redux-api-middleware

import RepoList from '../components/RepoList';
import RepoDetails from '../components/RepoDetails';
import RepoContributors from '../components/RepoContributors';

class Index extends React.Component {
  render() {
    const listWidth = 240;

    return (
      <Fragment>
        <Head>
          <title>next-redux-saga-example</title>
        </Head>
        <div
          className="h-screen fixed overflow-x-hidden overflow-y-auto"
          style={{ width: listWidth }}
        >
          <RepoList />
        </div>

        <div className="p-3" style={{ marginLeft: listWidth }}>
          <RepoDetails />
          <RepoContributors />
        </div>
      </Fragment>
    );
  }
}

export default Index;
