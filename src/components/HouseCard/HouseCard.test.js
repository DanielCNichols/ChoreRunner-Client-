import React from 'react';
import ReactDOM from 'react-dom';
import HouseCard from './HouseCard';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('HouseCard component testing', () => {
  const house = {
    name: 'test',
    id: 1,
    members: [],
  };
  const handleDelete = () => {};
  const handleEdit = () => {};
  const handleAddMembers = () => {};
  const handleEditMember = () => {};
  const deleteMember = () => {};

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        <HouseCard
          house={house}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleAddMembers={handleAddMembers}
          handleEditMember={handleEditMember}
          deleteMember={handleDelete}
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
          <HouseCard
            house={house}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleAddMembers={handleAddMembers}
            handleEditMember={handleEditMember}
            deleteMember={handleDelete}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
