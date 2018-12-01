import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Spin } from 'antd';

const columns = [
  {
    title: 'Field',
    dataIndex: 'field',
  },
  {
    title: 'Value',
    dataIndex: 'value',
  },
];

export const getTree = (obj, parent = '') => {
  return Object.keys(obj).map(field =>
    typeof obj[field] === 'object' && obj[field] !== null
      ? { key: parent + field, field, children: getTree(obj[field], field) }
      : { key: parent + field, field, value: (obj[field] || '').toString() }
  );
};

export class RepoDetails extends React.Component {
  render() {
    const { details, loading, error } = this.props;
    if (loading) {
      return (
        <div className="h-screen flex flex-row justify-center items-center">
          <Spin size="large" />
        </div>
      );
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return (
      details && (
        <Fragment>
          <div className="text-center text-xl md:text-3xl mb-10">{details.full_name}</div>
          <Table columns={columns} dataSource={getTree(details)} pagination={{ position: 'top' }} />
        </Fragment>
      )
    );
  }
}

export const mapStateToProps = state => state.repoDetails;

export default connect(mapStateToProps)(RepoDetails);
