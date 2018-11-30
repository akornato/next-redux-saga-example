import React from 'react';
import { mount } from 'enzyme';

import { RepoList } from './RepoList';
import { mapStateToProps } from './RepoList';
import { fetchRepoListPage, fetchRepoDetails, fetchRepoContributors } from '../redux/actions';

const testRepoList = [
  {
    name: 'react',
    description: 'library',
    stargazers: {
      totalCount: 116716,
    },
  },
  {
    name: 'react-native',
    description: 'library',
    stargazers: {
      totalCount: 71460,
    },
  },
];

describe('container loading', () => {
  const dispatch = jest.fn();
  const wrapper = mount(<RepoList dispatch={dispatch} list={[]} loading={true} />);

  it('should have a list item skeleton', () => {
    expect(
      wrapper
        .find('Skeleton')
        .first()
        .props()
    ).toHaveProperty('loading', true);
  });
});

describe('container with error', () => {
  const dispatch = jest.fn();
  const wrapper = mount(
    <RepoList dispatch={dispatch} list={[]} loading={false} error={{ message: 'Error!' }} />
  );

  it('should render an error message', () => {
    expect(wrapper.contains(<p>Error!</p>)).toEqual(true);
  });
});

describe('container w/o error', () => {
  const dispatch = jest.fn();
  const wrapper = mount(<RepoList dispatch={dispatch} loading={false} list={testRepoList} />);

  it('should call dispatch(fetchRepoListPage()) on componentDidMount', () => {
    expect(dispatch).toBeCalledWith(fetchRepoListPage());
  });

  it('should have a properly sorted list item with repo info', () => {
    expect(
      wrapper
        .find('Meta')
        .first()
        .props()
    ).toHaveProperty('description', 'library');
    expect(
      wrapper
        .find('IconText')
        .first()
        .props()
    ).toHaveProperty('text', 116716);
  });

  it('should call dispatch(fetchRepoDetails()) and dispatch(fetchRepoContributors()) on repo click', () => {
    const listItem = wrapper.find('Item');
    listItem.first().simulate('click');
    expect(dispatch).toBeCalledWith(fetchRepoDetails('react'));
    expect(dispatch).toBeCalledWith(fetchRepoContributors('react'));
  });
});

describe('mapStateToProps', () => {
  it('should select repoList', () => {
    const state = { repoList: testRepoList };
    expect(mapStateToProps(state)).toEqual(testRepoList);
  });
});
