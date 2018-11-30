import { fork, take, put } from 'redux-saga/effects';
import { actionTypes, fetchRepoListPage } from './actions';

function* fetchRepoListPageWatcher() {
  while (true) {
    const action = yield take(actionTypes.FETCH_REPO_LIST_PAGE_SUCCESS);
    const { endCursor, hasNextPage } = action.payload.data.organization.repositories.pageInfo;
    if (hasNextPage) {
      yield put(fetchRepoListPage(endCursor));
    }
  }
}

function* rootSaga() {
  yield fork(fetchRepoListPageWatcher);
}

export default rootSaga;
