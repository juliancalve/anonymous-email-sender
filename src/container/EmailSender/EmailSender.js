import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import Modal from '../../components/Modal/Modal';
import { sendEmail } from '../../services/EmailSender';
import './EmailSender.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
const EmailSender = () => {

    const emailOptionsSchema = Yup.object().shape({
        email: Yup.string()
            .test('error', ( value ) => {
                if ( value)
                return false;
            }  ),
        subject: Yup.string()
            .required( 'Subject is required' ),
        message: Yup.string()
            .required( 'Message is required' )
    });

    const [ emailOptions, setEmailOptions ] = useState( {
        email: '',
        message: '',
        subject: ''
    } );

    const [ showInvalidFields, setShowInvalidFields ] = useState( false );

    const [ showModal, setShowModal ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( false );

    const handleChange = ( event ) => {
        setEmailOptions({
            ...emailOptions,
            [event.target.name]: event.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefaul();
        if ( emailOptions.email != '' && emailOptions.message != '' && emailOptions.subject != '' ) {
            showInvalidFields && setShowInvalidFields( false );
            sendEmail( emailOptions ).then(
                response => {
                    alert( response.message )
                    setEmailOptions( { email: '', message: '', subject: '' } )
                }
            ).catch( error => { setShowModal( !showModal ); } );
        }
        else {
            !showInvalidFields && setShowInvalidFields( true );
            
        }

    }

    return(
        <Layout>
            <div className='column is-four-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd'>
                <Formik
                initialValues={ emailOptions }
                validationSchema={ emailOptionsSchema }
                onSubmit={ values => { onSubmit( values ) }}>
                    { ( { errors, touched } ) => (
                        <form className='box'>
                            <div className='field'>
                                <label className='label'>Email</label>
                                <div className='control has-icons-left has-icons-right'>
                                    <Field 
                                    className='input'
                                    disabled={ isLoading }
                                    name='email'
                                    type='email'
                                    value={ emailOptions.email }
                                    placeholder='e.g. alex@example.com'
                                    onChange={ handleChange } />
                                    { errors.email && touched.email ? (
                                        <p className='has-text-danger'> { errors.email } </p>
                                    ) : null }
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>

                            <div className='field'>
                                <label className='label'>Subject</label>
                                <div className='control has-icons-left has-icons-right'>
                                    <input
                                    className='input'
                                    disabled={ isLoading }
                                    type='text'
                                    name='subject'
                                    required
                                    placeholder={`e.g. Hi, I'm John!`}
                                    value={ emailOptions.subject }
                                    onChange={ handleChange }
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-align-left"></i>
                                    </span>
                                </div>
                            </div>
                            <div className='field'>
                                <label className='label'>Message</label>
                                <div className='control'>
                                    <textarea
                                    className='input email-textarea'
                                    required
                                    disabled={ isLoading }
                                    type='text'
                                    name='message'
                                    value={ emailOptions.message }
                                    onChange={ handleChange }>
                                    </textarea>
                                </div>
                            </div>
                            { showInvalidFields && <p className='has-text-danger'>All fields are required.</p> }
                            <div className='column has-text-centered'>
                                <button className='button is-primary' type='button'>Send Mail</button>
                            </div>
                        </form>
                    ) }
                </Formik>

            </div>
            <Modal
            showModal={ showModal }>
            <div>
                <h3 className='title is-2 is-spaced text-center'>Oops!</h3>
                <p className='subtitle is-5'>Ocurrió un error al enviar el mail.</p>
                <p className='subtitle is-5'>Es posible que el email sea inválido o no exista.</p>
            </div>
            </Modal>
            
        </Layout>
    )
}

export default EmailSender;
