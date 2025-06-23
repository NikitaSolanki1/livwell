import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  orderId: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
  handler: (response: any) => void;
}

export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadRazorpay().then(setIsLoaded);
  }, []);

  const createOrder = async (amount: number) => {
    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const initPayment = async (options: RazorpayOptions) => {
    if (!isLoaded) {
      throw new Error('Razorpay not loaded');
    }

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return {
    isLoaded,
    createOrder,
    initPayment,
  };
};

// Helper function to load Razorpay script (call in useEffect, not as a component)
export function injectRazorpayScript() {
  if (typeof window === 'undefined') return;
  if (document.getElementById('razorpay-checkout-js')) return;
  const script = document.createElement('script');
  script.id = 'razorpay-checkout-js';
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  document.body.appendChild(script);
}
