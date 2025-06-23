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
