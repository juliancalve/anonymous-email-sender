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
        <div class="modal" id={ modalId }>
            <div class="modal-background"></div>
            <div class="modal-card">
                <section class="modal-card-body">
                    { children }
                </section>
                <footer class="modal-card-foot">
                    { accept && <button
                    class="button is-success"
                    onClick={ () => {
                        accept.action && accept.action();
                        toggleModal();
                    }}>
                        { accept.label || 'Accept' }
                    </button> }
                    <button
                    class="button"
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
