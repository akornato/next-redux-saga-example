import { take, put } from 'redux-saga/effects';
import { actionTypes, fetchRepoListPage } from './actions';
import { fetchRepoListPageWatcher } from './saga';
import { repoListMock } from '../mocks';

describe('fetchRepoListPageWatcher', () => {
  const gen = fetchRepoListPageWatcher();

  it('should wait for fetched repo list page', () => {
    expect(gen.next().value).toEqual(take(actionTypes.FETCH_REPO_LIST_PAGE_SUCCESS));
  });

  it('should fetch another page if hasNextPage true', () => {
    expect(
      gen.next({
        type: actionTypes.FETCH_REPO_LIST_PAGE_SUCCESS,
        payload: {
          data: {
            organization: {
              repositories: {
                nodes: repoListMock,
                pageInfo: { endCursor: 'abc', hasNextPage: true },
              },
            },
          },
        },
      }).value
    ).toEqual(put(fetchRepoListPage('abc')));
  });

  it('should wait for fetched repo list page', () => {
    expect(gen.next().value).toEqual(take(actionTypes.FETCH_REPO_LIST_PAGE_SUCCESS));
  });

  it('should not fetch another page if hasNextPage false', () => {
    expect(
      gen.next({
        type: actionTypes.FETCH_REPO_LIST_PAGE_SUCCESS,
        payload: {
          data: {
            organization: {
              repositories: {
                nodes: repoListMock,
                pageInfo: { endCursor: 'abc', hasNextPage: false },
              },
            },
          },
        },
      }).value
    ).toEqual(take(actionTypes.FETCH_REPO_LIST_PAGE_SUCCESS));
  });
});
