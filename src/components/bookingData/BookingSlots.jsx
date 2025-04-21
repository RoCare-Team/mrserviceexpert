import React, { useEffect, useState } from 'react';
import AdressModal from '../modals/AdressModal';
import TimeSlotModal from '../modals/TimeSlotModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCalendarDays, faCalendarPlus, faCalendarTimes, faEnvelope, faMailBulk, faPhone, faSms, faUser, faUserCircle, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { Payment } from '@mui/icons-material';

function BookingSlots({ phoneNumber }) {
  // State to control the visibility of the TimeSlotModal
  const [addressOpen, setAddressOpen] = useState(false);
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);

  const [userName, setUserName] = useState(false);
  const [userEmail, setUserEmail] = useState(false);

  useEffect(() => {
    setUserEmail(localStorage.getItem('email'));
    setUserName(localStorage.getItem('name'));
  }, [])


  // State to track completion status of each step
  const [steps, setSteps] = useState({
    address: {
      completed: false,
      data: null
    },
    timeSlot: {
      completed: false,
      data: null
    },
    payment: {
      completed: false,
      data: null
    }
  });

  //   const handleAddressClose = () => {
  //   setAddressOpen(false);
  // };
  const savedAddress = localStorage.getItem('bookingAddress');

  // localStorage.setItem('address_id2',data.address_id);
  // console.log(data.address_id);

  useEffect(() => {
    try {
      //for getting the data of address which has been saved 

     

      if (savedAddress) {
        const parsedAddress = JSON.parse(savedAddress);
        setSteps(prevSteps => ({
          ...prevSteps,
          address: {
            completed: true,
            data: parsedAddress
          }
        }));

        console.log(JSON.parse(savedAddress)+"this is saved address");
      }
      const savedTimeSlot = localStorage.getItem('bookingTimeSlot');
      if (savedTimeSlot) {
        const parsedTimeSlot = JSON.parse(savedTimeSlot);
        setSteps(prevSteps => ({
          ...prevSteps,
          timeSlot: {
            completed: true,
            data: parsedTimeSlot
          }
        }));
      }

    } catch (error) {
      console.error("issue in the getting the data" + error);

    }

  }, []);
  const handleAddressOpen = () => {
    setAddressOpen(true);
  };

  // const handleAddressOpen=()=>{
  //   setAddressOpen(true);
  // }

  // Function to handle address selection
  const handleAddressSelected = (selectedAddress) => {
    setSteps({
      ...steps,
      address: {
        completed: true,
        data: selectedAddress
        
      }
    });
  
    
    // localStorage.setItem('bookingAddress', selectedAddress); was causing the object issue
    localStorage.setItem('bookingAddress', JSON.stringify(selectedAddress));
    console.log("Saved Address:", JSON.parse(localStorage.getItem('bookingAddress')));


  };


  const getDisplayAddress = (addressData) => {
    try {
      // Case 1: If addressData is null or undefined
      if (!addressData) {
        return "";
      }
      
      // Case 2: If addressData is already a string that's not JSON
      if (typeof addressData === 'string' && !addressData.startsWith('{')) {
        return addressData;
      }
      
      // Case 3: If addressData is a stringified JSON
      if (typeof addressData === 'string' && addressData.startsWith('{')) {
        const parsedAddress = JSON.parse(addressData);
        
        // Return formattedAddress if available
        if (parsedAddress.formattedAddress) {
          return parsedAddress.formattedAddress;
        }
        
        // If there's an address property
        if (parsedAddress.address) {
          return parsedAddress.address;
        }
        
        // If there are individual address components, combine them
        if (parsedAddress.houseNo || parsedAddress.street) {
          return [
            parsedAddress.houseNo,
            parsedAddress.street,
            parsedAddress.landmark,
            parsedAddress.city, 
            parsedAddress.state,
            parsedAddress.pincode
          ].filter(Boolean).join(', ');
        }
        
        // Last resort for object
        return "Address selected";
      }
      
      // Case 4: If addressData is already an object
      if (typeof addressData === 'object') {
        // Return formattedAddress if available
        if (addressData.formattedAddress) {
          return addressData.formattedAddress;
        }
        
        // If there's an address property
        if (addressData.address) {
          return addressData.address;
        }
        
        // If there are individual address components, combine them
        if (addressData.houseNo || addressData.street) {
          return [
            addressData.houseNo,
            addressData.street,
            addressData.landmark,
            addressData.city,
            addressData.state,
            addressData.pincode
          ].filter(Boolean).join(', ');
        }
        
        // Last resort for object
        return "Address selected";
      }
      
      // Default case
      return String(addressData);
    } catch (error) {
      console.error("Error formatting address for display:", error);
      return "Address selected";
    }
  };

  // Function to handle time slot selection
  const handleTimeSlotSelected = (selectedTimeSlot) => {
    setSteps({
      ...steps,
      timeSlot: {
        completed: true,
        data: selectedTimeSlot
      }
    });
    localStorage.setItem('bookingTimeSlot', JSON.stringify(selectedTimeSlot));
    // Close the modal after selection
    setShowTimeSlotModal(false);
  };

  // Function to close time slot modal
  const handleCloseTimeSlotModal = () => {
    setShowTimeSlotModal(false);
  };


  // const payload={cust_id,cust_mobile,address_id,cust_email,cart_id,appointment_time,appointment_date};



  // Function to handle payment completion
  const handlePaymentCompleted =async (paymentDetails) => {
//  if(Payment.completed==='false'){
//   toast.error('Complete the all details before doing it');
//  }

  const cust_id= localStorage.getItem('customer_id');
  const cust_mobile=localStorage.getItem('userPhone');
  const address_id=JSON.parse(localStorage.getItem('address_id'));

  const checkoutState =JSON.parse(localStorage.getItem('checkoutState'));
  const cust_email=localStorage.getItem('email');

  // const cart_id=checkoutState.map(item => item.category_cart_id);
  const cart_id=checkoutState[0].category_cart_id;
  const selected_time_slot=JSON.parse(localStorage.getItem('bookingTimeSlot') || "[]");
  const appointment_time=selected_time_slot.time;
  const appointment_date=selected_time_slot.date;
  // console.log(cart_id);
  
  const payload={cust_id,cust_mobile,address_id,cust_email,cart_id,appointment_time,appointment_date};

  // console.log(JSON.stringify(payload)+'heres the details which goes from frontend side');
  

    setSteps({
      ...steps,
      payment: {
        completed: true,
        data: paymentDetails
      }
    });
    const res = await fetch("https://waterpurifierservicecenter.in/customer/ro_customer/add_lead_with_full_dtls.php", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(payload),
    });
    
    const data = await res.json();
// console.log(data);

    if(data.error==false){
  
      toast.success(data.msg);
      localStorage.removeItem("address_id")
      localStorage.removeItem("bookingTimeSlot")
      localStorage.removeItem("bookingAddress")
      localStorage.removeItem("checkoutState")
      localStorage.removeItem("time_slot")
      localStorage.removeItem("cart_total_price")
      // window.location.reload();

      window.location.href=`${data.lead_id_for_payment}`

      
    }


    // toast.success('');
  };

  return (
    <div className="bookingContainer">
      <div className=' bookingHeading text-white flex flex-row items-center justify-center gap-2.5 p-5 rounded-xl mb-4 '> <FontAwesomeIcon icon={faBook}/>    <h3 className=' text-xl'>Booking Confirmation</h3></div>
      <div className="bookingDetails">
        <div className="bookingSlots flex items-center g-2.5">
          <div className="flex gap-1.5">
            <div className="text-blue-800">
           
              <FontAwesomeIcon icon={faUserCircle} />

            </div>
            <div className="flex flex-col items-start">
              <p className='text-black'>Booking Details</p>
              <span className='text-gray-500 flex items-center gap-2.5 '><FontAwesomeIcon icon={faUser} />Name: {userName}</span>
              <span className='text-gray-500 flex items-center gap-2.5'><FontAwesomeIcon icon={faEnvelope} />Email: {userEmail}</span>
              <span className='text-gray-500 flex items-center gap-2.5'><FontAwesomeIcon icon={faPhone} />Phone: {phoneNumber}</span>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="flex flex-col selectAddress bookingSlots  items-start gap-2.5">
          <div className="flex gap-2.5 items-center flex-row ">
            <div className="text-blue-800">
              {/* Map/Location Icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="billAdress ">
              <p className='text-black'>Address</p>
            </div>
          </div>
          {/* <AdressModal
            buttonName={steps.address.completed ? 'Edit' : 'Select an Address'}
            onAddressSelected={handleAddressSelected}
            
          /> */}
          <div className={`flex gap-1.5 ${steps.address.completed ? 'flex-row-reverse' : 'flex-col'}`}>
          
            <button onClick={handleAddressOpen} className='bookingBtn'>{steps.address.completed ? 'Edit ' : 'Select an Address'}</button>
            {steps.address.completed && steps.address.data && (
            <div className="selected-address-preview text-sm text-green-600">
              {/* <p>{steps.address.data.houseNo}, {steps.address.data.city}, {steps.address.data.state}, {steps.address.data.pincode},{steps.address.street}</p> */}
              <p className='break-all'>
                {/* {savedAddress} */}

                {getDisplayAddress(steps.address.data)}

                {/* {typeof savedAddress === 'object'
    ? savedAddress.formattedAddress || Object.values(savedAddress.formattedAddress).join(', ')
    : savedAddress
    
    }  */}
    
    
   

              </p>
            </div>
          )}
            <AdressModal setAddressOpen={setAddressOpen} addressOpen={addressOpen} onAddressSelected={handleAddressSelected} />
          </div>
         
        </div>

        {/* Time Slot Section - Only enabled if address is completed */}
        <div className={`SlotsArea bookingSlots ${!steps.address.completed ? 'opacity-50' : ''}`}>
          <div className="flex items-center gap-1.5">
            <div className="text-blue-800 w-7">
              {/* Clock/Timer Icon SVG */}
            <FontAwesomeIcon icon={faCalendarDays}/>
            {/* <FontAwesomeIcon icon="fa-regular fa-calendar-clock" /> */}
            </div>
            <p className='text-black'>Appointment Time</p>
          </div>

          {steps.address.completed ? (
            <>
              <div className='mt-1.5 '>
                <div className={`flex gap-1.5 ${steps.timeSlot.completed ? 'flex-row-reverse justify-between' : 'flex'}`}>
                  {/* Button to open time slot modal */}
                  <button
                    onClick={() => setShowTimeSlotModal(true)}
                    className="bookingBtn"
                  >
                    {steps.timeSlot.completed ? 'Change Time Slot' : 'Select Time Slot'}
                  </button>

                  {steps.timeSlot.completed && steps.timeSlot.data && (
                    <div className="selected-slot-preview text-sm text-gray-400 mt-2">
                      <p className='text-black'>Booked For: {steps.timeSlot.data?.date} at {steps.timeSlot.data?.time}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Only render the modal when showTimeSlotModal is true */}
              {showTimeSlotModal && (
                <TimeSlotModal
                  // onTimeSlotSelected={handleTimeSlotSelected} 
                  // onClose={handleCloseTimeSlotModal}
                  open={showTimeSlotModal}
                  onTimeSlotSelected={handleTimeSlotSelected}
                  onClose={handleCloseTimeSlotModal}
                />
              )}
            </>
          ) : (
            <button disabled className="text-gray-400">
              Please select an address first
            </button>
          )}


        </div>

        {/* Payment Section - Only enabled if time slot is completed */}
        <div className={`SlotsArea bookingSlots ${!steps.timeSlot.completed ? 'opacity-50' : ''}`}>
          <div className="flex items-center gap-1.5">
            <div className=" text-blue-800 w-8">
              {/* Payment/Credit Card Icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <p>Payment</p>
          </div>

          {steps.timeSlot.completed ? (
            <div className="mt-1.5 ">
              <button
                className="bookingBtn w-full h-12"
                onClick={() => {
                  handlePaymentCompleted({ id: 'sample-payment' });
                }}
              >
                Proceed to Payment
              </button>
            </div>
          ) : (
            <button disabled className="text-gray-400">
              Please select a time slot first
            </button>
          )}

          {steps.payment.completed && (
            <div className="payment-confirmation text-sm text-green-600 mt-2">
              Payment completed successfully
            </div>
          )}
        </div>
      </div>


    </div>
  );
}

export default BookingSlots;