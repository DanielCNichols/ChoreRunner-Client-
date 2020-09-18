import React from 'react';
import ReactDOM from 'react-dom';
import MemberDashRoute from './MemberDashRoute';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('MemberDashboard component testing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        <MemberDashRoute />
      </MemoryRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <MemberDashRoute />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
