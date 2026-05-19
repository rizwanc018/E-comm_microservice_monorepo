"use client";

import useCartStore from "@/stores/cartStore";
import { useAuth } from "@clerk/nextjs";
import { ShippingFormInputs } from "@repo/types";
// import { CheckoutProvider } from "@stripe/react-stripe-js";
import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";
import CheckoutForm from "./CheckoutForm";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

// const fetchClientSecret = async (cart: CartItemsType, token: string) => {
//     return fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`, {
//         method: "POST",
//         body: JSON.stringify({
//             cart,
//         }),
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//     })
//         .then((response) => response.json())
//         .then((json) => json.checkoutSessionClientSecret);
// };

const StripePaymentForm = ({ shippingForm }: { shippingForm: ShippingFormInputs }) => {
    const { cart } = useCartStore();
    const [token, setToken] = useState<string | null>(null);
    // const [clientSecret, setClientSecret] = useState<string | null>(null);
    const { getToken } = useAuth();

    console.log({ cart });

    useEffect(() => {
        getToken().then((t) => {
            setToken(t);
            // if (t) fetchClientSecret(cart, t).then(setClientSecret);
        });
    }, []);

    const clientSecret = useMemo(() => {
        if (!token) return null;
        return fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`, {
            method: "POST",
            body: JSON.stringify({
                cart,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => data.clientSecret);
    }, [token]);

    if (!token || !clientSecret) {
        return <div>Loading...</div>;
    }

    return (
        <CheckoutElementsProvider stripe={stripe} options={{ clientSecret }}>
            <CheckoutForm shippingForm={shippingForm} />
        </CheckoutElementsProvider>
    );
};

// const StripePaymentForm = async ({ shippingForm }: { shippingForm: ShippingFormInputs }) => {
//     const { cart } = useCartStore();
//     const [token, setToken] = useState<string | null>(null);
//     const { getToken } = useAuth();

//     useEffect(() => {
//         getToken().then((token) => setToken(token));
//     }, []);

//     if (!token) {
//         return <div className="">Loading...</div>;
//     }

//     return (
//         <CheckoutElementsProvider
//             stripe={stripe}
//             options={{ clientSecret: await fetchClientSecret(cart, token) }}
//         >
//             <CheckoutForm shippingForm={shippingForm} />
//         </CheckoutElementsProvider>
//     );
// };

export default StripePaymentForm;
