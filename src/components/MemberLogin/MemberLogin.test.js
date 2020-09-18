import React from 'react';
import ReactDOM from 'react-dom';
import MemberLogin from './MemberLogin';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('MemberLogin component testing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        <MemberLogin />
      </MemoryRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <MemberLogin />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
