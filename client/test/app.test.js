
import { ReactDOM } from 'react-dom'
import React from 'react';
import 'regenerator-runtime/runtime'
import { cleanup, fireEvent, render } from '@testing-library/react';
import { create } from "react-test-renderer";
import App from '../src/App'
import Enzyme,{ shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'
import * as actions from '../src/App'

Enzyme.configure({ adapter: new Adapter() });

describe("<App />", () => {
  it("Renders <App /> component correctly", async () => {
    const wrapper = shallow(<App/>)
    expect(toJson(wrapper)).toMatchSnapshot()
  });

  test("Button", () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.find('button').length).toBe(17)
  });

  test("div", () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.find('div').length).toBe(7)
  });

  test("h2", () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.find('h2').length).toBe(1)
  });
  
});

