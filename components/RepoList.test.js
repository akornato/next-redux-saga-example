import React from 'react';
import { shallow, mount } from 'enzyme';

import { RepoList, mapStateToProps } from './RepoList';
import { repoListMock } from '../mocks';
import { fetchRepoListPage, fetchRepoDetails, fetchRepoContributors } from '../redux/actions';

describe('loading state', () => {
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

describe('error state', () => {
  const dispatch = jest.fn();
  const wrapper = shallow(
    <RepoList dispatch={dispatch} list={[]} loading={false} error={{ message: 'Error!' }} />
  );

  it('should render an error message', () => {
    expect(wrapper.contains(<p>Error!</p>)).toEqual(true);
  });
});

describe('regular state', () => {
  const dispatch = jest.fn();
  const wrapper = mount(<RepoList dispatch={dispatch} loading={false} list={repoListMock} />);

  it('should call fetchRepoListPage on componentDidMount', () => {
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

  it('should call fetchRepoDetails and etchRepoContributors on repo click', () => {
    const listItem = wrapper.find('Item');
    listItem.first().simulate('click');
    expect(dispatch).toBeCalledWith(fetchRepoDetails('react'));
    expect(dispatch).toBeCalledWith(fetchRepoContributors('react'));
  });
});

describe('mapStateToProps', () => {
  it('should select repoList', () => {
    const state = { repoList: repoListMock };
    expect(mapStateToProps(state)).toEqual(repoListMock);
  });
});
