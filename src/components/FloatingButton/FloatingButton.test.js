import React from 'react';
import ReactDOM from 'react-dom';
import FloatingButton from './FloatingButton';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Button component testing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        <FloatingButton />
      </MemoryRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <FloatingButton />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
