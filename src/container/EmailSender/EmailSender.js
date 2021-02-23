import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { sendEmail } from '../../services/EmailSender';
import './EmailSender.css';
const EmailSender = () => {

    const [ emailOptions, setEmailOptions ] = useState( {
        email: '',
        message: '',
        subject: ''
    } );

    const [ showInvalidFields, setShowInvalidFields ] = useState( false );

    const handleChange = ( event ) => {
        setEmailOptions({
            ...emailOptions,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = () => {
        if ( emailOptions.email != '' && emailOptions.message != '' && emailOptions.subject != '' ) {
            showInvalidFields && setShowInvalidFields( false );
            sendEmail( emailOptions ).then(
                response => {
                    alert( response.message )
                    setEmailOptions( { email: '', message: '', subject: '' } )
                }
            ).catch( error => { alert( error.message ) } );
        }
        else {
            !showInvalidFields && setShowInvalidFields( true );
        }

    }

    return(
        <Layout>
            <div className='column is-four-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd'>
                <form className='box'>
                    <div className='field'>
                        <label className='label'>Email</label>
                        <div className='control has-icons-left has-icons-right'>
                            <input 
                            className='input'
                            name='email' type='email'
                            placeholder='e.g. alex@example.com'
                            onChange={ handleChange }
                            />
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
                            type='text'
                            name='subject'
                            placeholder='subject'
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
                            type='text'
                            name='message'
                            placeholder='Message'
                            onChange={ handleChange }>
                            </textarea>
                        </div>
                    </div>
                    { showInvalidFields && <p className='has-text-danger'>All fields are required.</p> }
                    <div className='column has-text-centered'>
                        <button className='button is-primary' type='button' onClick={ handleSubmit }>Send Mail</button>
                    </div>
                </form>
            </div>
            
        </Layout>
    )
}

export default EmailSender;
