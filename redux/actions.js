import { RSAA } from 'redux-api-middleware';

export const actionTypes = {
  FETCH_REPO_LIST_PAGE_START: 'FETCH_REPO_LIST_PAGE_START',
  FETCH_REPO_LIST_PAGE_SUCCESS: 'FETCH_REPO_LIST_PAGE_SUCCESS',
  FETCH_REPO_LIST_PAGE_ERROR: 'FETCH_REPO_LIST_PAGE_ERROR',
  FETCH_REPO_DETAILS_START: 'FETCH_REPO_DETAILS_START',
  FETCH_REPO_DETAILS_SUCCESS: 'FETCH_REPO_DETAILS_SUCCESS',
  FETCH_REPO_DETAILS_ERROR: 'FETCH_REPO_DETAILS_ERROR',
  FETCH_REPO_CONTRIBUTORS_START: 'FETCH_REPO_CONTRIBUTORS_START',
  FETCH_REPO_CONTRIBUTORS_SUCCESS: 'FETCH_REPO_CONTRIBUTORS_SUCCESS',
  FETCH_REPO_CONTRIBUTORS_ERROR: 'FETCH_REPO_CONTRIBUTORS_ERROR',
};

export function fetchRepoListPage(after = '') {
  return {
    [RSAA]: {
      endpoint: '/.netlify/functions/fetchRepoListPage',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        // repos have to be sorted client side for now because of a bug in graphql API:
        // https://platform.github.community/t/list-org-repos-ordered-by-stargazers-not-working/7505
        query: `query { 
            organization(login:"facebook") {
              repositories(first:100, after: ${after}){
                pageInfo{
                  endCursor
                  hasNextPage
                }
                nodes {
                  name
                  description
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }`,
      }),
      types: [
        actionTypes.FETCH_REPO_LIST_PAGE_START,
        actionTypes.FETCH_REPO_LIST_PAGE_SUCCESS,
        actionTypes.FETCH_REPO_LIST_PAGE_ERROR,
      ],
    },
  };
}

export function fetchRepoDetails(repo) {
  return {
    [RSAA]: {
      // might as well use REST API since we just want all fields
      endpoint: `https://api.github.com/repos/facebook/${repo}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      types: [
        actionTypes.FETCH_REPO_DETAILS_START,
        actionTypes.FETCH_REPO_DETAILS_SUCCESS,
        actionTypes.FETCH_REPO_DETAILS_ERROR,
      ],
    },
  };
}

export function fetchRepoContributors(repo) {
  return {
    [RSAA]: {
      // still not possible to get repo contributors from graphql API...
      // https://platform.github.community/t/contributors-of-a-repository/3680/11
      endpoint: `https://api.github.com/repos/facebook/${repo}/contributors`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      types: [
        actionTypes.FETCH_REPO_CONTRIBUTORS_START,
        actionTypes.FETCH_REPO_CONTRIBUTORS_SUCCESS,
        actionTypes.FETCH_REPO_CONTRIBUTORS_ERROR,
      ],
    },
  };
}
