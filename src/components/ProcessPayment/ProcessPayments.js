import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Cardelement from './Cardelement';
import Splitecard from '../Splitcardform/Splitecard';

const stripePromise = loadStripe('pk_test_51IeGsCLEjhlpQHYHTTpyGYC7J8vVFhBjez8P37PGzl4QzYwAdUO1DYiDnMWOImx7Vji9wGaSppkbmdWRxjxRmCGT00FWKum5X8');
const ProcessPayments = ({handlePayment}) => {
    return (
            <Elements stripe={stripePromise}>
               {/* <Splitecard/> */}
               <Cardelement handlePayment={handlePayment}/>
            </Elements>
    );
};

export default ProcessPayments;