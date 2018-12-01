import configureMockStore from 'redux-mock-store';
import { apiMiddleware } from 'redux-api-middleware';
import { actionTypes, fetchRepoListPage, fetchRepoDetails, fetchRepoContributors } from './actions';
import { repoListMock, repoDetailsMock, repoContributorsMock } from '../mocks';

const middlewares = [apiMiddleware];
const mockStore = configureMockStore(middlewares);

describe('action creators', () => {
  beforeEach(() => fetch.resetMocks());

  test('fetchRepoListPage', () => {
    fetch.mockResponseOnce(
      JSON.stringify({ data: { organization: { repositories: { nodes: repoListMock } } } }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const expected = [
      { type: actionTypes.FETCH_REPO_LIST_PAGE_START },
      {
        type: actionTypes.FETCH_REPO_LIST_PAGE_SUCCESS,
        payload: { data: { organization: { repositories: { nodes: repoListMock } } } },
      },
    ];
    const store = mockStore({});
    return store.dispatch(fetchRepoListPage()).then(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(store.getActions()).toEqual(expected);
    });
  });

  test('fetchRepoDetails', () => {
    fetch.mockResponseOnce(JSON.stringify(repoDetailsMock), {
      headers: { 'Content-Type': 'application/json' },
    });

    const expected = [
      { type: actionTypes.FETCH_REPO_DETAILS_START },
      { type: actionTypes.FETCH_REPO_DETAILS_SUCCESS, payload: repoDetailsMock },
    ];
    const store = mockStore({});
    return store.dispatch(fetchRepoDetails()).then(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(store.getActions()).toEqual(expected);
    });
  });

  test('fetchRepoContributors', () => {
    fetch.mockResponseOnce(JSON.stringify(repoContributorsMock), {
      headers: { 'Content-Type': 'application/json' },
    });

    const expected = [
      { type: actionTypes.FETCH_REPO_CONTRIBUTORS_START },
      { type: actionTypes.FETCH_REPO_CONTRIBUTORS_SUCCESS, payload: repoContributorsMock },
    ];
    const store = mockStore({});
    return store.dispatch(fetchRepoContributors()).then(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(store.getActions()).toEqual(expected);
    });
  });
});
