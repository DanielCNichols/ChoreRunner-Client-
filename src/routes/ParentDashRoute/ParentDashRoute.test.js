import React from 'react';
import ReactDOM from 'react-dom';
import ParentDashRoute from './ParentDashRoute';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('ParentDashRoute component testing', () => {
  const match = {
    params: {
      id: 1,
    },
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <ParentDashRoute />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <ParentDashRoute />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
