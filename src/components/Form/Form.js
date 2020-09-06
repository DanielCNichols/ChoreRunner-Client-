import React from 'react';
import cx from 'classnames';
import s from './Form.module.css';

export function Label({ className, ...props }) {
  return <label className={cx(`${s.Label}`, className)} {...props} />;
}
export function Fieldset({ className, ...props }) {
  return (
    <fieldset className={cx(`${s.Fieldset}`, className)} {...props}></fieldset>
  );
}
export function Legend({ className, ...props }) {
  return <legend className={cx(`${s.Legend}`, className)} {...props}></legend>;
}

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={cx(`${s.Input}`, className)}
      type="text"
      ref={ref}
      {...props}
    />
  );
});

export function Required({ className, ...props }) {
  return (
    <span className={cx('Required', className)} {...props}>
      &#42;
    </span>
  );
}

export function FormElement({ className, ...props }) {
  return <div className={cx(`${s.FormElement}`, className)} {...props}></div>;
}

export function Textarea({ className, ...props }) {
  return <textarea className={cx(`${s.TextArea}`, className)} {...props} />;
}
