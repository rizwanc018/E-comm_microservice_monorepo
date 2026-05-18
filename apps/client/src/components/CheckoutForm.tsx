"use client";

import { ShippingFormInputs } from "@repo/types";
// import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";
import { PaymentElement, useCheckoutElements } from "@stripe/react-stripe-js/checkout";

import { ConfirmError } from "@stripe/stripe-js";
import { useState } from "react";

const CheckoutForm = ({ shippingForm }: { shippingForm: ShippingFormInputs }) => {
    // const checkout = useCheckoutElements();
    const checkoutState = useCheckoutElements();
    // if (checkoutState.type !== "success") return;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ConfirmError | null>(null);

    const handleClick = async () => {
        setLoading(true);
        if (checkoutState.type === "loading") {
            return <div>Loading...</div>;
        } else if (checkoutState.type === "error") {
            return <div>Error: {checkoutState.error.message}</div>;
        }
        const checkout = checkoutState.checkout;

        await checkout.updateEmail(shippingForm.email);
        await checkout.updateBillingAddress({
            name: shippingForm.name,
            address: {
                line1: shippingForm.address,
                city: shippingForm.city,
                state: shippingForm.state,
                postal_code: shippingForm.postalCode,
                country: "IN",
            },
        });
        await checkout.updateShippingAddress({
            name: shippingForm.name,
            address: {
                line1: shippingForm.address,
                city: shippingForm.city,
                state: shippingForm.state,
                postal_code: shippingForm.postalCode,
                country: "IN",
            },
        });

        console.log({ checkout });

        const res = await checkout.confirm();
        if (res.type === "error") {
            setError(res.error);
        }
        setLoading(false);
    };

    if (checkoutState.type === "error") {
        return <div>Error: {checkoutState.error.message}</div>;
    }

    return (
        <form>
            <PaymentElement
                options={{ layout: "accordion", fields: { billingDetails: { name: "never" } } }}
            />
            <button disabled={loading} onClick={handleClick}>
                {checkoutState.type === "loading" || loading
                    ? "Loading..."
                    : `Pay ${checkoutState.checkout.total.total.amount} now`}
            </button>
            {error && <div className="">{error.message}</div>}
        </form>
    );
};

export default CheckoutForm;
