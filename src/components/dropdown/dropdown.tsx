import React from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";
import { Content, DropdownStyle } from './dropdown-style';

const Dropdown = (props: any) => {
  const { content, placement, title, action, children, style, className } = props;

  return (
    <DropdownStyle
      overlayClassName={className}
      // @ts-ignore
      style={style}
      placement={placement}
      title={title}
      overlay={<Content>{content}</Content>}
      trigger={action}
    >
      {children}
    </DropdownStyle>
  );
};

const content = (
  <>
    <Link href="#">
      <span>Export to CSV</span>
    </Link>
    <Link href="#">
      <span>Export to XML</span>
    </Link>
    <Link href="#">
      <span>Export to Drive</span>
    </Link>
  </>
);

Dropdown.defaultProps = {
  action: ['hover'],
  placement: 'bottomCenter',
  content,
  style: {},
  className: 'strikingDash-dropdown',
};

Dropdown.propTypes = {
  placement: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.array,
  content: PropTypes.node,
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
};

export { Dropdown };
