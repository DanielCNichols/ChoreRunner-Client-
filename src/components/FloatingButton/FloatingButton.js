import React from 'react';
import cx from 'classnames';
import s from './FloatingButton.module.css';
import { BsPlusCircleFill } from 'react-icons/bs';

const FloatingButton = ({ className, ...props }) => {
  return (
    <div className={s.buttonMenuContainer}>
      <button className={cx(`${s.FloatingButton}`, className)} {...props}>
        <BsPlusCircleFill />
      </button>
    </div>
  );
};

export default FloatingButton;
