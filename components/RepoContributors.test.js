import React from 'react';
import { shallow, mount } from 'enzyme';

import { RepoContributors, mapStateToProps } from './RepoContributors';

const repoContributorsMock = [
  {
    login: 'akornato',
    html_url: 'https://github.com/akornato',
  },
];

describe('loading state', () => {
  const dispatch = jest.fn();
  const wrapper = shallow(
    <RepoContributors dispatch={dispatch} contributors={[]} loading={true} />
  );

  it('should show a spinner', () => {
    expect(wrapper.find('Spin')).toHaveLength(1);
  });
});

describe('error state', () => {
  const dispatch = jest.fn();
  const wrapper = shallow(
    <RepoContributors dispatch={dispatch} list={[]} loading={false} error={{ message: 'Error!' }} />
  );

  it('should render an error message', () => {
    expect(wrapper.contains(<p>Error!</p>)).toEqual(true);
  });
});

describe('regular state', () => {
  const dispatch = jest.fn();
  const wrapper = mount(
    <RepoContributors dispatch={dispatch} loading={false} contributors={repoContributorsMock} />
  );

  it('should have a list item with contributor info', () => {
    expect(
      wrapper
        .find('Meta')
        .first()
        .props()
    ).toHaveProperty('title', 'akornato');
    expect(
      wrapper
        .find('a')
        .first()
        .props()
    ).toHaveProperty('href', 'https://github.com/akornato');
  });
});

describe('mapStateToProps', () => {
  it('should select repoContributors', () => {
    const state = { repoContributors: repoContributorsMock };
    expect(mapStateToProps(state)).toEqual(repoContributorsMock);
  });
});
