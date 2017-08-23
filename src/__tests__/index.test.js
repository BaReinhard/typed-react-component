import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import Index from '../index';
let props = {
    style: { fontSize: '51px' },
    typings: ['Hello there my friend', 'Another Test portion', 'Last one here'],
    loop: true,
    typeSpeed: 15,
    delay: 1200,
    startDelay: 1200,
};
function setup() {
    return mount(<Index {...props} />);
}
describe('Index Testing', () => {
    it('Ensure Index Renders', () => {
        const wrapper = setup();
        expect(wrapper).toExist();
    });
    it('Test Props', () => {
        const wrapper = setup();
        expect(wrapper.props()).toEqual(props);
    });
    it('Test Styles are passed properly', () => {
        const wrapper = setup();
        expect(wrapper.html().match(/style="([^"]*)"/g)[0]).toBe(`style="font-size: ${props.style.fontSize};"`);
        expect(wrapper.html().match(/style="([^"]*)"/g)[1]).toBe('style="opacity: 0;"');
    });
    it('Test array fill for delay', () => {
        const wrapper = setup();
        expect(wrapper.state().delay.length).toBe(props.typings.length);
    });
    it('Test State Params', () => {
        const wrapper = setup();
        expect(wrapper.state().typeForward).toBeTruthy;
        expect(wrapper.state().typings).toEqual(props.typings);
        expect(wrapper.state().maxIndex).toEqual(props.typings.length - 1);
        expect(wrapper.state().index).toEqual(0);
    });
});
