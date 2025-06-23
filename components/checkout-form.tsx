"use client";

import { useState, useEffect } from 'react';
import { useRazorpay, injectRazorpayScript } from '@/lib/razorpay';
import { Button } from '@/components/ui/button';

interface CheckoutFormProps {
  amount: number;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: Error) => void;
}

export default function CheckoutForm({ amount, onSuccess, onError }: CheckoutFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isLoaded, createOrder, initPayment } = useRazorpay();

  useEffect(() => {
    injectRazorpayScript();
  }, []);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      
      // Create order on the backend
      const { orderId } = await createOrder(amount);

      // Initialize Razorpay payment
      await initPayment({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "Livwell",
        description: "Food Order Payment",
        orderId: orderId,
        prefill: {
          name: "Customer Name", // You can pass these from props
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#10B981" // Emerald-500 to match your theme
        },
        handler: function (response: any) {
          // Handle successful payment
          onSuccess?.(response.razorpay_payment_id);
        }
      });
    } catch (error) {
      console.error("Payment failed:", error);
      onError?.(error as Error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="space-y-4">
        <div className="text-lg font-semibold">
          Order Total: ₹{amount.toFixed(2)}
        </div>
        <Button
          onClick={handlePayment}
          disabled={!isLoaded || isProcessing}
          className="w-full"
        >
          {isProcessing ? "Processing..." : "Pay Now with UPI/Card"}
        </Button>
      </div>
    </div>
  );
}
