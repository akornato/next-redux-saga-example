import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'jest-fetch-mock';
import { setConfig } from 'next/config';
import { publicRuntimeConfig } from './next.config';

global.fetch = fetch;

configure({ adapter: new Adapter() });

setConfig({ publicRuntimeConfig });
