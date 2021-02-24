import React, { useEffect } from 'react';
import uuid from 'react-uuid';

const Modal = ( { children, accept, cancel, showModal } ) => {

    const modalId = uuid();

    useEffect( () => {
        if ( showModal !== null )
            toggleModal();
    }, [ showModal ] );


    const toggleModal = () => {
        let modal = document.getElementById( modalId );
        modal.classList.toggle( 'is-active' );
    }

    return(
        <div className="modal" id={ modalId }>
            <div className="modal-background"></div>
            <div className="modal-card">
                <section className="modal-card-body">
                    <div className="modal__body">
                        { children }
                    </div>
                </section>
                <footer className="modal-card-foot">
                    { accept && <button
                    className="button is-success"
                    onClick={ () => {
                        accept.action && accept.action();
                        toggleModal();
                    }}>
                        { accept.label || 'Accept' }
                    </button> }
                    <button
                    className="button"
                    onClick={ () => {
                        cancel?.action && cancel.action();
                        toggleModal();
                    } }>
                        { cancel?.label || 'Cancel' }
                    </button>
                </footer>
            </div>

        </div>
    )
}

export default Modal;
