import React, { useEffect, useState } from "react";
import EmptyCart from "../../assets/images/emptyCart.png";
import RemoveItem from "../../assets/images/Remove.png";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ScaleLoader } from 'react-spinners';

const Cart = ({ cartLoaded }) => {

  const [cartDataArray, setCartDataArray] = useState([]);
  const [finalTotal, setFinalTotal] = useState(0);
  const [cartLoader, setCartLoader] = useState(false);



  const displayCartData = () => {
    const cartdata = localStorage.getItem('checkoutState');



    // const cartDataArray = cartdata ? JSON.parse(cartdata) || [] : [];

    const cartDataArray = JSON.parse(localStorage.getItem('checkoutState') || '[]');



    setFinalTotal(localStorage.getItem('cart_total_price'));

    setCartDataArray(cartDataArray);
  }

  useEffect(() => {

    displayCartData(cartLoaded);
  }, [cartLoaded])

  // cartLoaded

  const onIncrement = async (service_id, type, qunt) => {
    const cid = localStorage.getItem("customer_id");
    const num = Number(qunt);
    const quantity = num + 1;

    if (quantity <= 5) {
      const payload = { service_id, type, cid, quantity };


      const res = await fetch("https://waterpurifierservicecenter.in/customer/ro_customer/add_to_cart.php", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      localStorage.setItem('checkoutState', JSON.stringify(data.AllCartDetails));
      localStorage.setItem('cart_total_price', data.total_price);

      // console.log(data);



      displayCartData();
      toast.success(data.msg);


    } else {
      toast.error("You can't add more than 5 items");
    }

  };




  const onDecrement = async (service_id, type, qunt) => {
    const cid = localStorage.getItem("customer_id");
    const num = Number(qunt);
    const quantity = num - 1;

    if (quantity <= 5) {
      const payload = { service_id, type, cid, quantity };


      const res = await fetch("https://waterpurifierservicecenter.in/customer/ro_customer/add_to_cart.php", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      // localStorage.setItem('checkoutState', JSON.stringify(data.AllCartDetails));
      // localStorage.setItem('cart_total_price', data.total_price);
      localStorage.setItem('checkoutState', JSON.stringify(data.AllCartDetails == null ? [] : data.AllCartDetails));
      localStorage.setItem('cart_total_price', data.total_price == null ? 0 : data.total_price);
      displayCartData();
      toast.success(data.msg);


    } else {
      toast.success('hey hey hey ')
    }

  };


  const handleRemoveFromCart = async (service_id, type, qunt) => {
    const cid = localStorage.getItem("customer_id");

    const quantity = 0;
    const payload = { service_id, type, cid, quantity };



    const res = await fetch("https://waterpurifierservicecenter.in/customer/ro_customer/add_to_cart.php", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    // localStorage.setItem('checkoutState', JSON.stringify(data.AllCartDetails));
    // localStorage.setItem('cart_total_price', data.total_price);

    localStorage.setItem('checkoutState', JSON.stringify(data.AllCartDetails == null ? [] : data.AllCartDetails));
    localStorage.setItem('cart_total_price', data.total_price == null ? 0 : data.total_price);

    displayCartData();
    toast.success(data.msg);


  };





  return (
    <div className="cart">

      <h2>Cart</h2>

      {/* <ScaleLoader /> */}


      {cartDataArray.length === 0 ? (
        <div className="emptyStyle">
          <img src={EmptyCart} alt="Empty Cart" className="emptyImg" />
          <p className="text-center">No services added.</p>
        </div>
      ) : (
        <>
          {cartDataArray?.map((service) => (
            <div key={service.leadtype_id} className="p-2.5">
              <p>{service.leadtype_name}</p>

              {/* Assuming service.innerArray is the nested array */}
              {service.cart_dtls?.map((item, index) => (
                <div className="cart-item-body" key={item.service_id}>
                  <div className="cart-item">
                    <div className="service-details flex items-start flex-col">
                      <div className="flex items-center gap-4 ">
                        <span>{item.service_name}</span>

                        {/* <span><img src={item.image} alt="" srcset="" /></span> */}

                        <div className="quantity-control">
                          <button className="IncrementDcrementBtn" onClick={() => onDecrement(item.service_id, 'delete', item.quantity)}>
                            -
                          </button>
                          <span>{item.quantity || 1}</span>
                          <button
                            className="IncrementDcrementBtn"
                            onClick={() => onIncrement(item.service_id, 'add', item.quantity)}
                            disabled={(item.quantity || 1) >= 5}
                            style={{
                              opacity: (item.quantity || 1) >= 5 ? 0.5 : 1,
                              cursor: (item.quantity || 1) >= 5 ? 'not-allowed' : 'pointer'
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-gray-400">
                        <div dangerouslySetInnerHTML={{ __html: item.description }} />
                      </div>
                      {/* ₹{item.price} */}
                    </div>
                    <div className="flex flex-col px-1">
                      ₹{item.total_price}
                      <IconButton onClick={() => handleRemoveFromCart(item.service_id, 'delete', item.quantity)} color="error" className="p-0">
                        <img src={RemoveItem} alt="Remove" style={{ width: 24, height: 24 }} />
                      </IconButton>
                    </div>
                  </div>

                </div>
              ))}

            </div>
          ))}

          <div className="cart-footer">

            {/* {discountPercentage > 0 && (
              <div className="cart-discount">
                <p className="congratsHeading">
                  🎉 Congrats! You saved ₹<strong>{discountAmount.toFixed(2)}</strong>
                </p>
              </div>
            )} */}


            <div className="totalSection">
              <Link to={'/checkout'}><div className="cart-total forMb" style={{ cursor: 'pointer' }}>
                <strong>Total: ₹{finalTotal}</strong>
                <button>View Cart</button>
              </div></Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;