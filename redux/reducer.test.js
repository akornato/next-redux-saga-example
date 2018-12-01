import reducer, { initialState } from './reducer';
import { actionTypes } from './actions';
import { repoListMock, repoDetailsMock, repoContributorsMock } from '../mocks';

describe('reducers', () => {
  test(actionTypes.FETCH_REPO_LIST_PAGE_START, () => {
    const action = { type: actionTypes.FETCH_REPO_LIST_PAGE_START };
    const expectedState = {
      ...initialState,
      repoList: { ...initialState.repoList, loading: true },
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.FETCH_REPO_LIST_PAGE_ERROR, () => {
    const action = {
      type: actionTypes.FETCH_REPO_LIST_PAGE_ERROR,
      payload: new Error('Error!'),
    };
    const expectedState = {
      ...initialState,
      repoList: { ...initialState.repoList, error: new Error('Error!') },
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.FETCH_REPO_LIST_PAGE_SUCCESS, () => {
    const action = {
      type: actionTypes.FETCH_REPO_LIST_PAGE_SUCCESS,
      payload: {
        data: {
          organization: {
            repositories: { nodes: repoListMock, pageInfo: { endCursor: '', hasNextPage: true } },
          },
        },
      },
    };
    const expectedState = {
      ...initialState,
      repoList: { ...initialState.repoList, list: repoListMock, loading: false },
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.FETCH_REPO_DETAILS_START, () => {
    const action = { type: actionTypes.FETCH_REPO_DETAILS_START };
    const expectedState = {
      ...initialState,
      repoDetails: { ...initialState.repoDetails, loading: true },
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.FETCH_REPO_DETAILS_ERROR, () => {
    const action = {
      type: actionTypes.FETCH_REPO_DETAILS_ERROR,
      payload: new Error('Error!'),
    };
    const expectedState = {
      ...initialState,
      repoDetails: { ...initialState.repoDetails, error: new Error('Error!') },
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.FETCH_REPO_DETAILS_SUCCESS, () => {
    const action = {
      type: actionTypes.FETCH_REPO_DETAILS_SUCCESS,
      payload: repoDetailsMock,
    };
    const expectedState = {
      ...initialState,
      repoDetails: { ...initialState.repoDetails, details: repoDetailsMock, loading: false },
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.FETCH_REPO_CONTRIBUTORS_START, () => {
    const action = { type: actionTypes.FETCH_REPO_CONTRIBUTORS_START };
    const expectedState = {
      ...initialState,
      repoContributors: { ...initialState.repoContributors, loading: true },
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.FETCH_REPO_CONTRIBUTORS_ERROR, () => {
    const action = {
      type: actionTypes.FETCH_REPO_CONTRIBUTORS_ERROR,
      payload: new Error('Error!'),
    };
    const expectedState = {
      ...initialState,
      repoContributors: { ...initialState.repoContributors, error: new Error('Error!') },
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  test(actionTypes.FETCH_REPO_CONTRIBUTORS_SUCCESS, () => {
    const action = {
      type: actionTypes.FETCH_REPO_CONTRIBUTORS_SUCCESS,
      payload: repoContributorsMock,
    };
    const expectedState = {
      ...initialState,
      repoContributors: {
        ...initialState.repoContributors,
        contributors: repoContributorsMock,
        loading: false,
      },
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  test('default', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
