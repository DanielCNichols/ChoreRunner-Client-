import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('Modal component testing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        <Modal titleText="testModal">
          <AddTaskForm members={[]} />
        </Modal>
      </MemoryRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });
});
