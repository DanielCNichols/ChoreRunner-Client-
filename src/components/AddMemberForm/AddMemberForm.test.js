import React from 'react';
import ReactDOM from 'react-dom';
import AddMemberForm from './AddMemberForm.js';
import renderer from 'react-test-renderer';

const props = [
  {
    id: 1,
    handleAddMembers: () => {},
    toggleAddMembers: () => {},
  },
];

it('renders AddMemberForm without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddMemberForm props={props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders AddMemberF as expected', () => {
  const tree = renderer.create(<AddMemberForm props={props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
