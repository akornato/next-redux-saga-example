import { combineReducers } from 'redux';
import { actionTypes } from './actions';

export const initialState = {
  repoList: {
    list: [],
    pageInfo: { endCursor: '', hasNextPage: true },
    loading: false,
    error: null,
  },
  repoDetails: { details: null, loading: false, error: null },
  repoContributors: { contributors: [], loading: false, error: null },
};

const repoListReducer = (state = initialState.repoList, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REPO_LIST_PAGE_START:
      return { ...state, loading: true, error: null };
    case actionTypes.FETCH_REPO_LIST_PAGE_SUCCESS:
      return {
        ...state,
        list: state.list.concat(action.payload.data.organization.repositories.nodes),
        pageInfo: action.payload.data.organization.repositories.pageInfo,
        loading: false,
      };
    case actionTypes.FETCH_REPO_LIST_PAGE_ERROR:
      return {
        ...initialState.repoList,
        error: action.payload,
      };

    default:
      return state;
  }
};

const repoDetailsReducer = (state = initialState.repoDetails, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REPO_DETAILS_START:
      return { ...state, loading: true, error: null };
    case actionTypes.FETCH_REPO_DETAILS_SUCCESS:
      return {
        ...state,
        details: action.payload,
        loading: false,
      };
    case actionTypes.FETCH_REPO_DETAILS_ERROR:
      return { ...initialState.repoDetails, error: action.payload };

    default:
      return state;
  }
};

const repoContributorsReducer = (state = initialState.repoContributors, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REPO_CONTRIBUTORS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_REPO_CONTRIBUTORS_SUCCESS:
      return {
        ...state,
        contributors: action.payload,
        loading: false,
      };
    case actionTypes.FETCH_REPO_CONTRIBUTORS_ERROR:
      return {
        ...initialState.repoContributors,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default combineReducers({
  repoList: repoListReducer,
  repoDetails: repoDetailsReducer,
  repoContributors: repoContributorsReducer,
});
