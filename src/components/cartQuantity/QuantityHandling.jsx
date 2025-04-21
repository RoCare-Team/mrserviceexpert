import React from "react";
import { toast } from "react-toastify";

const Quantityhandling = ({ serviceId, quantity, type = "service", onUpdate }) => {

    const cid = localStorage.getItem("customer_id");
    const handleIncrement = async () => {
        if (quantity >= 5) {
            toast.error("You can't add more than 5 items");
            return;
        }


        const updatedQuantity = Number(quantity) + 1;

        try {
            const payload = { service_id: serviceId, type: "add", cid, quantity: updatedQuantity };

            const res = await fetch("https://waterpurifierservicecenter.in/customer/ro_customer/add_to_cart.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            localStorage.setItem('checkoutState', JSON.stringify(data.AllCartDetails, data.total_cart_price, data.cart_id));

            // Call the callback to update parent component state if provided
            if (onUpdate) {
                onUpdate('increment', serviceId, updatedQuantity, data);
            } 
            
        } catch (error) {
            console.error("Error incrementing quantity:", error);
            toast.error("Error updating quantity");
        }
    };

    const handleDecrement = async () => {

        const updatedQuantity = Number(quantity) - 1;

        if (updatedQuantity < 1) {
            // Consider handling removal differently if needed
            toast.info("Item removed from cart");
        }

        try {
            const payload = { service_id: serviceId, type: "delete", cid, quantity: updatedQuantity };

            const res = await fetch("https://waterpurifierservicecenter.in/customer/ro_customer/add_to_cart.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            localStorage.setItem('checkoutState', JSON.stringify(data.AllCartDetails, data.total_cart_price, data.cart_id));

            // Call the callback to update parent component state if provided
            if (onUpdate) {
                onUpdate('decrement', serviceId, updatedQuantity, data);
            }
        } catch (error) {
            console.error("Error decrementing quantity:", error);
            toast.error("Error updating quantity");
        }
    };

    return (
        <div className="quantity-control">
            <button
                className="IncrementDcrementBtn"
                onClick={handleDecrement}
            >
                -
            </button>
            <span>{quantity || 1}</span>
            <button
                className="IncrementDcrementBtn"
                onClick={handleIncrement}
                disabled={quantity >= 5}
                style={{
                    opacity: quantity >= 5 ? 0.5 : 1,
                    cursor: quantity >= 5 ? 'not-allowed' : 'pointer'
                }}
            >
                +
            </button>
        </div>
    );
};

export default Quantityhandling;