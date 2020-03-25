import React from 'react';
import './Modal.css'

export default function Modal(props) {
    return (
        <section className="modal">
        {props.children}
        </section>
    )
}