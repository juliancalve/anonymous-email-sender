import axios from 'axios';

export function sendEmail( { message, subject, email } ) {
    return axios.post( 'https://anonymous-email-sender.herokuapp.com/send-mail', { message, subject, email } );
}