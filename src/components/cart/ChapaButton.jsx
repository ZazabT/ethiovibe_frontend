import React from 'react'
import { FaCreditCard } from 'react-icons/fa';
import chapaLogo from '/chapa.png';

const ChapaButton = ({ amount, email, firstName, lastName, txRef }) => {
  return (
    <div className='mt-4'>
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
        <input type="hidden" name="public_key" value={import.meta.env.VITE_CHAPA_PUBLIC_KEY} />
        <input type="hidden" name="tx_ref" value={txRef || 'ethiovibe-tx-123'} />
        <input type="hidden" name="amount" value={amount || '10'} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email || 'customer@example.com'} />
        <input type="hidden" name="first_name" value={firstName || 'Customer'} />
        <input type="hidden" name="last_name" value={lastName || 'Name'} />
        <input type="hidden" name="title" value="EthioVibe Purchase" />
        <input type="hidden" name="description" value="Payment for your EthioVibe order" />
        <input type="hidden" name="logo" value="https://your-logo-url.com/logo.png" />
        <input type="hidden" name="callback_url" value={`${window.location.origin}/payment/callback`} />
        <input type="hidden" name="return_url" value={`${window.location.origin}/payment/success`} />
        <input type="hidden" name="meta[title]" value="EthioVibe Order" />
        
        <button 
          type="submit"
          className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-lime-300 bg-white text-lime-600 rounded-xl hover:bg-lime-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <img 
            src={chapaLogo} 
            className="h-8 w-auto object-contain" 
            alt="Chapa Payment" 
          />
          <span className="font-medium">Pay with Chapa</span>
          <span className="text-sm bg-lime-100 px-3 py-1 rounded-full font-medium">
            {amount || '10'} ETB
          </span>
        </button>
      </form>
    </div>
  );
};

export default ChapaButton;