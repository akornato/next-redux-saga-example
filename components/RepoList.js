import React from 'react';
import { connect } from 'react-redux';
import { List, Skeleton, Icon } from 'antd';

import { fetchRepoListPage, fetchRepoDetails, fetchRepoContributors } from '../redux/actions';

const IconText = ({ type, text }) => (
  <div className="px-3">
    <Icon type={type} className="mr-3" />
    {text}
  </div>
);

class RepoList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRepoListPage());
  }

  render() {
    const { list, loading, error, dispatch } = this.props;
    if (error) {
      return JSON.stringify(error);
    }
    // repos have to be sorted client side for now because of a bug in graphql API:
    // https://platform.github.community/t/list-org-repos-ordered-by-stargazers-not-working/7505
    let listShown = list.sort((a, b) => b.stargazers.totalCount - a.stargazers.totalCount);
    if (loading || typeof window === 'undefined') {
      listShown = list.concat(
        [...new Array(10)].map(() => ({
          loading: true,
          name: '',
          stargazers: { totalCount: '' },
          description: '',
        }))
      );
    }
    return (
      <List
        itemLayout="vertical"
        dataSource={listShown}
        locale={{ emptyText: '' }}
        renderItem={repo => (
          <List.Item
            actions={[<IconText type="star-o" text={repo.stargazers.totalCount} />]}
            className="cursor-pointer hover:bg-blue-lightest"
            onClick={() => {
              dispatch(fetchRepoDetails(repo.name));
              dispatch(fetchRepoContributors(repo.name));
            }}
          >
            <div className="px-3">
              <Skeleton loading={repo.loading} active>
                <List.Item.Meta title={repo.name} description={repo.description} />
              </Skeleton>
            </div>
          </List.Item>
        )}
      />
    );
  }
}

const mapStateToProps = state => state.repoList;

export default connect(mapStateToProps)(RepoList);
