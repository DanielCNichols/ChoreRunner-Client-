import React from 'react';
import ReactDOM from 'react-dom';
import MembersCard from './MembersCard';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('MembersCard component testing', () => {
  const member = {
    name: 'daniel',
    level_id: 1,
    pointsToNextLevel: 2,
    completedTasks: [],
    assignedTasks: [],
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        <MembersCard member={member} />
      </MemoryRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <MembersCard member={member} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
