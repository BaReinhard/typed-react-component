import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import Index from '../index';
function setup() {
    let props = {};
    return shallow(<Index {...props} />);
}
describe('Index Testing', () => {
    it('Ensure Index Renders', () => {
        const wrapper = setup();

        expect(wrapper).toExist();
    });
});
