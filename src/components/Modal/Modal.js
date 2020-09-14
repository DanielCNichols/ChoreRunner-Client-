import React from 'react';
import AriaModal from 'react-aria-modal';

export default function Modal({ titleText, children }) {
  return (
    <AriaModal verticallyCenter="true" titleText={titleText}>
      {children}
    </AriaModal>
  );
}
