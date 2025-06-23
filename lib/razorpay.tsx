import Script from 'next/script';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Function to inject Razorpay script
export const injectRazorpayScript = () => {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  document.body.appendChild(script);
};

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  orderId: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: any) => void;
}

export const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkRazorpayLoaded = setInterval(() => {
        if (window.Razorpay) {
          setIsLoaded(true);
          clearInterval(checkRazorpayLoaded);
        }
      }, 100);

      // Cleanup interval
      return () => clearInterval(checkRazorpayLoaded);
    }
  }, []);

  const createOrder = async (amount: number) => {
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Math.round(amount * 100) }), // Ensure integer paise
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const data = await response.json();
      return { orderId: data.orderId };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const initPayment = (options: RazorpayOptions) => {
    return new Promise((resolve, reject) => {
      if (!isLoaded) {
        reject(new Error('Razorpay not loaded'));
        return;
      }

      const razorpay = new window.Razorpay({
        ...options,
        handler: (response: any) => {
          options.handler(response);
          resolve(response);
        },
      });

      razorpay.open();
    });
  };

  return {
    isLoaded,
    createOrder,
    initPayment,
  };
};
