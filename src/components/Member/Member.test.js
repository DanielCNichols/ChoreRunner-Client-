import React from 'react';
import ReactDOM from 'react-dom';
import Member from './Member';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('Member component testing', () => {
  const member = {
    id: 1,
    name: 'daniel',
    pointsToNextLevel: 3,
    household_id: 2,
  };

  const deleteMember = () => {};
  const editMember = () => {};
  const showEdit = true;

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        <Member
          deleteMember={deleteMember}
          editMember={editMember}
          showEdit={showEdit}
          member={member}
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
          <Member
            deleteMember={deleteMember}
            editMember={editMember}
            showEdit={showEdit}
            member={member}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
