import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import Index from '../index';
function setup() {
    let props = {
        style: { fontSize: '50px' },
        typings: ['Hello there my friend', 'Another Test portion', 'Last one here'],
        loop: true,
        typeSpeed: 15,
        delay: 1200,
        startDelay: 1200,
    };
    return shallow(<Index {...props} />);
}
describe('Index Testing', () => {
    it('Ensure Index Renders', () => {
        const wrapper = setup();

        expect(wrapper).toExist();
    });
});
