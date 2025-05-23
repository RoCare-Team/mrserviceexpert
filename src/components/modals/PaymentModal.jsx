import React, { useState } from 'react';
import { Modal, Box, Typography, Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCreditCard,
  faLocationDot,
  faUser,
  faList
} from '@fortawesome/free-solid-svg-icons';


export default function PaymentModal({ open, handleClose, serviceDetails,leadDetails }) {

  // const data =  {
  //   status: "status of service",
  //   userName: "user name",
  //   address: "address of the user ",
  //   date: "booking date",
  //   time: "10:00 AM - 11:00 AM",
  //   paymentStatus: "payment status"
  // };
  const data = serviceDetails || {
    status: "N/A",
    lead_type: "N/A",
    lead_id: "N/A",
    amount: "N/A",
    lead_add_date: "N/A",
    name: "N/A",
    address: "N/A",
    time: "N/A",
    payment_status: "N/A"
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="payment-modal-title"
      aria-describedby="payment-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        bgcolor: 'white',
        boxShadow: 24,
        borderRadius: 2,
        // p: 4,
        p: { xs: 3, sm: 4, md: 6 },
        maxWidth: "500px",
        width: { xs: "90%", sm: "80%", md: "100%" },
        // paddingInline:4
      }}>
        <Typography onClick={handleClose} sx={{ background: '#6d28d9', borderRadius: '50%', padding: '10px',margin:'0px', position: 'absolute', top: '-10px', right: '-10px', cursor: 'pointer',color:'white',display:'flex',justifyContent:'center',alignItems:'center' }} >x</Typography>

        <Typography id="payment-modal-title" variant="h6" component="h2" sx={{ mb: 2, background: '#6d28d9', padding: '5px', borderRadius: '14px 14px 0px 0px', color: 'white' }}>
          Booking Details of {data.lead_type}
        </Typography>

        {/* Booking Status */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          p: 2,
          bgcolor: 'grey.100',
          borderRadius: 1
        }}>
          <FontAwesomeIcon icon={faList} style={{ marginRight: '16px', color: '#6d28d9' }} />
          <Box sx={{
     
          }}>
            <Typography variant="body2" fontWeight="bold">Booking Status</Typography>
            {/* <Typography variant='span'>{data.lead_id}</Typography> */}
            <Typography variant="span" color='#90EE90'>{data.status}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

        {/* User Details */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          p: 2,
          bgcolor: 'grey.100',
          borderRadius: 1
        }}>
          <FontAwesomeIcon icon={faUser} style={{ marginRight: '16px', color: '#6d28d9' }} />
          <Box>
          <Typography variant="body2" ><b>Name</b></Typography>
            <Typography variant="span" fontWeight="bold" color='#99a1af'>{data.name}</Typography>
            
          </Box>
        </Box>

        <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

        {/* Address Details */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          p: 2,
          bgcolor: 'grey.100',
          borderRadius: 1
        }}>
          <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '16px', color: '#6d28d9' }} />
          <Box>
            <Typography variant="body2">{data.address}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

        {/* Time Details */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          p: 2,
          bgcolor: 'grey.100',
          borderRadius: 1
        }}>
          <FontAwesomeIcon icon={faClock} style={{ marginRight: '16px', color: '#6d28d9' }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">{data.appointment_date}</Typography>
            <Typography variant="body2">at {data.appointment_time}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

        {/* Payment Status */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          bgcolor: 'grey.100',
          borderRadius: 1,
          // cursor: 'pointer'
        }}>
          <FontAwesomeIcon icon={faCreditCard} style={{ marginRight: '16px', color: '#6d28d9' }} />
          <Box>
          <Typography variant="subtitle2">Payment Status</Typography>
            <Typography variant="body2" fontWeight="bold" color='orange'>{data.payment_status}</Typography>
           
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}