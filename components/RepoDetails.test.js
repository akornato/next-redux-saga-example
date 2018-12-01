import React from 'react';
import { shallow, mount } from 'enzyme';

import { RepoDetails, getTree, mapStateToProps } from './RepoDetails';
import { repoDetailsMock } from '../mocks';

describe('loading state', () => {
  const dispatch = jest.fn();
  const wrapper = shallow(<RepoDetails dispatch={dispatch} list={[]} loading={true} />);

  it('should show a spinner', () => {
    expect(wrapper.find('Spin')).toHaveLength(1);
  });
});

describe('error state', () => {
  const dispatch = jest.fn();
  const wrapper = shallow(
    <RepoDetails dispatch={dispatch} list={[]} loading={false} error={{ message: 'Error!' }} />
  );

  it('should render an error message', () => {
    expect(wrapper.contains(<p>Error!</p>)).toEqual(true);
  });
});

describe('regular state', () => {
  const dispatch = jest.fn();
  const wrapper = mount(
    <RepoDetails dispatch={dispatch} loading={false} details={repoDetailsMock} />
  );

  it('should have repo data in a table', () => {
    expect(wrapper.exists('Table')).toEqual(true);
  });
});

describe('getTree', () => {
  it('should convert object into a tree', () => {
    expect(getTree(repoDetailsMock)).toEqual([
      { key: 'name', field: 'name', value: 'react' },
      { key: 'description', field: 'description', value: 'library' },
      { key: 'somenullfield', field: 'somenullfield', value: '' },
      {
        key: 'owner',
        field: 'owner',
        children: [
          {
            key: 'ownerhtml_url',
            field: 'html_url',
            value: 'https://github.com/facebook',
          },
        ],
      },
    ]);
  });
});

describe('mapStateToProps', () => {
  it('should select repoDetails', () => {
    const state = { repoDetails: repoDetailsMock };
    expect(mapStateToProps(state)).toEqual(repoDetailsMock);
  });
});
