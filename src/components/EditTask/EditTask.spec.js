import React from 'react';
import ReactDOM from 'react-dom';
import EditTaskForm from './EditTaskForm';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('PlayerStats component testing', () => {
  const task = {
    id: 1,
    title: 'test',
    points: 3,
    household_id: 2,
  };

  const handleToggle = () => {};
  const editTask = () => {};

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        <EditTaskForm
          task={task}
          handleToggle={handleToggle}
          editTask={editTask}
        />
      </MemoryRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <EditTaskForm
            task={task}
            handleToggle={handleToggle}
            editTask={editTask}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
