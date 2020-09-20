import React from 'react';
import ReactDOM from 'react-dom';
import Loading from './Loading';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';

describe('Loading component testing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Loading />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
