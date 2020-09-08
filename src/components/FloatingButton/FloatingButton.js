import React, { useState } from 'react';
import cx from 'classnames';
import s from './FloatingButton.module.css';
import { AiOutlinePlus } from 'react-icons/ai';

const FloatingButton = React.forwardRef(({ className, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={s.buttonMenuContainer}>
      {open && (
        <div className={s.buttonMenu}>
          <ul>
            <li>Add Member</li>
            <li>Add Group</li>
          </ul>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={cx(`${s.floatingButton}`, className)}
        ref={ref}
        {...props}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
});

export default FloatingButton;
