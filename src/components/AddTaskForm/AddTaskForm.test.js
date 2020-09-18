import React from 'react';
import ReactDOM from 'react-dom';
import AddTaskForm from './AddTaskForm';
import renderer from 'react-test-renderer';

describe('AddTaskForm tests', () => {
  const members = [
    {
      id: 1,
      name: 'daniel',
    },
  ];

  const addTask = () => {};
  const toggleAdd = () => {};

  it('renders AddTask without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <AddTaskForm members={members} toggleAdd={toggleAdd} addTask={addTask} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders AddTask as expected', () => {
    const tree = renderer
      .create(
        <AddTaskForm
          members={members}
          toggleAdd={toggleAdd}
          addTask={addTask}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
