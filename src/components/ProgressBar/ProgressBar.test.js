import React from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from './ProgressBar';
import renderer from 'react-test-renderer';

describe('ProgressBar component testing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<ProgressBar progressPoints={2} />, div);

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders UI as expected', () => {
    const tree = renderer.create(<ProgressBar progressPoints={2} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
