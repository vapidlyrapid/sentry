import React from 'react';
import {mount} from 'enzyme';
import DropdownReact from 'app/components/dropdownReact';

describe('DropdownReact', function() {
  const INPUT_1 = {
    title: 'test',
    onOpen: () => {},
    onClose: () => {},
    topLevelClasses: 'top-level-class',
    alwaysRenderMenu: true,
    menuClasses: '',
  };

  describe('renders', function() {
    it('and anchors to left by default', function() {
      let component = mount(
        <DropdownReact {...INPUT_1}>
          <div>1</div>
          <div>2</div>
        </DropdownReact>
      );

      expect(component).toMatchSnapshot();
    });

    it('and anchors to right', function() {
      let component = mount(
        <DropdownReact {...INPUT_1} anchorRight>
          <div>1</div>
          <div>2</div>
        </DropdownReact>
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('Uncontrolled', function() {
    let wrapper;

    beforeEach(function() {
      if (wrapper) {
        wrapper.unmount();
      }

      wrapper = mount(
        <DropdownReact title="test">
          <li>hi</li>
        </DropdownReact>
      );
    });

    describe('While Closed', function() {
      it('displays dropdown menu when dropdown actor button clicked', function() {
        expect(wrapper.find('li')).toHaveLength(0);

        // open
        wrapper.find('a').simulate('click');
        expect(wrapper.find('li').length).toBe(1);
      });
    });
    describe('While Opened', function() {
      beforeEach(function() {
        // Opens dropdown menu
        wrapper.find('a').simulate('click');
      });

      it('closes when clicked outside', function() {
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', false, true);
        document.body.dispatchEvent(evt);
        expect(wrapper.find('li').length).toBe(0);
      });

      it('closes when dropdown actor button is clicked', function() {
        wrapper.find('a').simulate('click');
        expect(wrapper.find('li').length).toBe(0);
      });

      it('closes when dropdown menu item is clicked', function() {
        wrapper.find('li').simulate('click');
        expect(wrapper.find('li').length).toBe(0);
      });

      it('does not close when menu is clicked and `keepMenuOpen` is on', function() {
        wrapper = mount(
          <DropdownReact title="test" keepMenuOpen>
            <li>hi</li>
          </DropdownReact>
        );
        wrapper.find('a').simulate('click');
        wrapper.find('li').simulate('click');
        expect(wrapper.find('li').length).toBe(1);
        wrapper.unmount();
      });
    });
  });

  describe('Controlled', function() {
    let wrapper;

    beforeEach(function() {
      if (wrapper) {
        wrapper.unmount();
      }
    });
    describe('Opened', function() {
      beforeEach(function() {
        wrapper = mount(
          <DropdownReact isOpen={true} title="test">
            <li>hi</li>
          </DropdownReact>
        );
      });

      it('does not close when menu is clicked', function() {
        // open
        wrapper.find('li').simulate('click');
        // State does not change
        expect(wrapper.find('.dropdown-menu').length).toBe(1);
      });

      it('does not close when document is clicked', function() {
        jQuery(document).click();
        // State does not change
        expect(wrapper.find('.dropdown-menu').length).toBe(1);
      });

      it('does not close when dropdown actor is clicked', function() {
        wrapper.find('a').simulate('click');
        // State does not change
        expect(wrapper.find('.dropdown-menu').length).toBe(1);
      });
    });
    describe('Closed', function() {
      beforeEach(function() {
        wrapper = mount(
          <DropdownReact isOpen={false} title="test">
            <li>hi</li>
          </DropdownReact>
        );
      });

      it('does not open when dropdown actor is clicked', function() {
        wrapper.find('a').simulate('click');
        // State does not change
        expect(wrapper.find('.dropdown-menu').length).toBe(0);
      });
    });
  });
});
