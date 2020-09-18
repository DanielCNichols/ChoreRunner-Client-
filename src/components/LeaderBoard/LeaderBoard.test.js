import React from 'react';
import ReactDOM from 'react-dom';
import LeaderBoard from './LeaderBoard';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('LeaderBoard component testing', () => {
  const rankings = [];

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        <LeaderBoard rankings={[]} />
      </MemoryRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <LeaderBoard rankings={[]} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
