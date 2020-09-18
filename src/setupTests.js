import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const noop = () => {};
Object.defineProperty(window, 'scroll', { value: noop, writable: true });
