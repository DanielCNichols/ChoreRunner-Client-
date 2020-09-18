import React from 'react';
import ReactDOM from 'react-dom';
import EditMember from './EditMember';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('EditMember component testing', () => {
  const member = {
    member_id: 1,
    name: 'test',
    username: 'test-user',
    household_id: 2,
    password: 'pass',
  };

  const editMember = () => {};
  const toggleEdit = () => {};

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        <EditMember
          member={member}
          editMember={editMember}
          toggleEdit={toggleEdit}
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
          <EditMember
            member={member}
            editMember={editMember}
            toggleEdit={toggleEdit}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
