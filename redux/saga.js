import { take, put } from 'redux-saga/effects';
import { actionTypes, fetchRepoListPage } from './actions';

export function* fetchRepoListPageWatcher() {
  while (true) {
    const action = yield take(actionTypes.FETCH_REPO_LIST_PAGE_SUCCESS);
    const { endCursor, hasNextPage } = action.payload.data.organization.repositories.pageInfo;
    if (hasNextPage) {
      yield put(fetchRepoListPage(endCursor));
    } else {
      continue;
    }
  }
}

export default fetchRepoListPageWatcher;
