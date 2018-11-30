import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { List, Avatar, Spin } from 'antd';

class RepoContributors extends React.Component {
  render() {
    const { contributors, loading, error } = this.props;
    if (loading) {
      return (
        <div className="h-screen flex flex-row justify-center items-center">
          <Spin size="large" />
        </div>
      );
    }
    if (error) {
      return error.message;
    }
    return contributors ? (
      <Fragment>
        <div className="text-center text-xl md:text-3xl my-10">Contributors</div>
        <List
          grid={{ gutter: 16, xs: 1, md: 2, lg: 3, xl: 4 }}
          dataSource={Object.values(contributors)}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar_url} />}
                title={item.login}
                description={
                  <a href={item.html_url} target="_blank" rel="noopener noreferrer">
                    {item.html_url}
                  </a>
                }
              />
            </List.Item>
          )}
        />
      </Fragment>
    ) : null;
  }
}

const mapStateToProps = state => state.repoContributors;

export default connect(mapStateToProps)(RepoContributors);
