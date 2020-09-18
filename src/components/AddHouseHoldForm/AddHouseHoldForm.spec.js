import React from 'react';
import ReactDOM from 'react-dom';
import AddHouseHoldForm from './AddHouseHoldForm';
import renderer from 'react-test-renderer';
import { expectation } from 'sinon';

describe('AddHouseholdForm tests', () => {
  let handleAdd = () => {};
  let toggleAdd = () => {};

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <AddHouseHoldForm toggleAdd={toggleAdd} handleAdd={handleAdd} />,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(<AddHouseHoldForm toggleAdd={toggleAdd} handleAdd={handleAdd} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
