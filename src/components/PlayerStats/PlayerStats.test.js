import React from 'react';
import ReactDOM from 'react-dom';
import PlayerStats from './PlayerStats';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('PlayerStats component testing', () => {
  const userStats = {
    level_id: 1,
    name: 'daniel',
    total_score: 23,
    badge: 'Badge1',
    pointsToNextLevel: 2,
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        <PlayerStats userStats={userStats} />
      </MemoryRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <PlayerStats userStats={userStats} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
