# Livwell – Fresh & Healthy Juices & Food Ordering Platform

A modern Next.js (App Router) + React + TypeScript web application for ordering healthy food and juices, featuring:
- Razorpay UPI/Card payment integration
- Firebase Auth for user login/signup
- Firestore for order storage and real-time updates
- Responsive UI with Tailwind CSS
- Customer and admin order management

---

## Features

- **Browse Menu:** View healthy dishes and juices
- **Cart & Checkout:** Add items, review cart, and checkout
- **Online Payments:** Secure UPI/Card payments via Razorpay
- **Order Storage:** Orders saved in Firestore with real-time status
- **User Auth:** Login/signup with Firebase Auth
- **Order History:** Customers can view their past orders
- **Admin Panel:** Admins can view and update all orders
- **Profile Management:** Update user info

---

## Tech Stack
- [Next.js 15 (App Router)](https://nextjs.org/)
- [React 18+](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Auth & Firestore](https://firebase.google.com/)
- [Razorpay Payments](https://razorpay.com/)
- [PNPM](https://pnpm.io/) for package management

---

## Getting Started

### 1. Clone the repo
```sh
git clone https://github.com/yourusername/livwell.git
cd livwell-1
```

### 2. Install dependencies
```sh
pnpm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root with the following:
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 4. Run the development server
```sh
pnpm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

---

## Project Structure
```
app/                # Next.js app directory (pages, layouts, API routes)
components/         # React UI components
hooks/              # Custom React hooks
lib/                # Utilities, Firebase, Razorpay, and data logic
public/             # Static assets (images, icons)
styles/             # Global styles (Tailwind CSS)
```

---

## Key Files
- `app/checkout/page.tsx` – Checkout page logic
- `components/checkout-form.tsx` – Razorpay payment form
- `lib/razorpay.tsx` – Razorpay integration (hook, script loader)
- `app/api/create-order/route.ts` – API route to create Razorpay orders
- `lib/firebase-service.ts` – Firebase initialization
- `lib/firebase-orders.ts` – Firestore order submission & retrieval
- `lib/types/order.ts` – TypeScript order interfaces

---

## Firestore Security Rules (Example)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow create: if request.auth != null && request.resource.data.customerId == request.auth.uid;
      allow read: if request.auth != null && resource.data.customerId == request.auth.uid;
      allow update: if request.auth != null && (
        (resource.data.customerId == request.auth.uid && request.resource.data.status == 'cancelled') ||
        (request.auth.token.admin == true)
      );
      allow delete: if false;
    }
    match /orders/{orderId} {
      allow read: if request.auth.token.admin == true;
    }
  }
}
```

---

## Deployment
- Deploy on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/)
- Set environment variables in your deployment dashboard

---

## License
MIT

---

## Credits
- [Razorpay](https://razorpay.com/)
- [Firebase](https://firebase.google.com/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Contact
For support, open an issue or contact the maintainer.

---

## Frontend Key Features

### 1. Modern Responsive UI
- Built with React and Next.js App Router for fast, seamless navigation.
- Fully responsive design using Tailwind CSS, ensuring optimal experience on mobile, tablet, and desktop.
- Clean, modern layouts with accessible color schemes and intuitive navigation.

### 2. Dynamic Menu Browsing
- Users can browse a rich menu of healthy dishes and juices, with product images, descriptions, and nutrition info.
- Menu items are organized by category (dishes, juices, etc.) for easy discovery.
- Featured and seasonal items are highlighted on the homepage.

### 3. Cart Management
- Add, remove, and update quantities of items in the cart from any page.
- Cart state is preserved across navigation and page reloads.
- Real-time price calculation, including subtotal and shipping.

### 4. Checkout Experience
- Streamlined checkout form collects shipping address, contact info, and payment method.
- Supports both Cash on Delivery (COD) and secure online payments via Razorpay (UPI/Card).
- Order summary with itemized breakdown and total before payment.

### 5. Online Payment Integration
- Razorpay payment gateway integration for UPI and card payments.
- Secure, real-time payment flow with error handling and user feedback.
- Payment status and order confirmation displayed instantly after transaction.

### 6. User Authentication & Profile
- Firebase Auth integration for email/password signup and login.
- Persistent user sessions with profile management (update name, email, phone, address).
- Authenticated users can access order history and personalized features.

### 7. Order History & Tracking
- Users can view their past orders, including details, status, and payment method.
- Real-time order status updates using Firestore listeners.
- Each order includes a unique ID, date, and itemized receipt.

### 8. Admin Dashboard (if enabled)
- Admins can view all orders, filter by status, and update order progress.
- Secure access control ensures only authorized users can manage orders.

### 9. Notifications & Feedback
- Toast notifications for key actions: order placed, payment success/failure, profile updates, etc.
- Clear error messages and loading indicators for all async operations.

### 10. Accessibility & Best Practices
- Keyboard navigable forms and buttons.
- Semantic HTML and ARIA attributes for screen readers.
- Optimized images and assets for fast load times.
