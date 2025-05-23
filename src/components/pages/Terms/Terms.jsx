import React, { useEffect, useState } from 'react';
import Demo from '../../pincodeStateCity/LocationSelector';
import BrandServices from '../../brandServices/BrandServices';
import StateLinks from '../../stateLinks/StateLinks';
import BasicDetails from '../../modals/BasicDetails';
import FaqAccordion from '../../Faq/faq';
import { data } from 'react-router-dom';
// import PaymentModal from '../../modals/paymentModal';
// import PaymentModal from '../../modals/PaymentModal';

function Terms() {
    const [serviceStates, setServiceStates] = useState([]);
    // const [open, setOpen] = useState(false);
  
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const handleCart =()=>{

        const city="delhi";
        const cat="ro-water-purifier"
        fetch('http://mrserviceexpert.com/webapis/get_city_category_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city,cat })
        })
        .then(res => res.json())
        .then(data => console.log("Backend Response:", data))
        .catch(err => console.error("Error sending city to backend:", err));

        console.log(data);
        
    }


    return (
        <div className='common-spacing bg-white'>
            <div className="termsSection">
            <h3 className="termsTitle">THE SERVICES</h3>
                <p>RO Care India will provide the Services to you under this Agreement. The Services constitute the provision of a technology platform that enables you, as a user of RO Care India’s mobile application (each, an "Application") or Website to (a) arrange and schedule home-based services with independent third party providers of those services, who have an agreement with RO Care India or its affiliates (“Third-Party Providers”); and (b) facilitate payments to Third Party Providers for the services and receive receipts for those payments.
                    The Services are made available solely for your personal, non-commercial use unless RO Care India has agreed with you otherwise in a separate agreement. You acknowledge that RO Care India does not provide home-based services and that all such home-based services are provided by independent third-party contractors who are not employed by RO Care India or any of its affiliates. RO Care India accepts liability for the Services and the RO Care India Platform that it provides to you subject to these Terms. Third-Party Providers are responsible for the services they provide to you.</p>

                <h3 className="termsTitle">License.</h3>
                <p>Subject to your compliance with these Terms, RO Care India grants you a limited, non-exclusive, non-sub licensable, revocable, non-transferable license to: (i) access and use the RO Care India Platform on your personal device solely in connection with your use of the Services; and (ii) access and use any content, information and related materials that may be made available through the Services, in each case solely for your personal, non-commercial use. Any rights not expressly granted herein are reserved by RO Care India and RO Care India’s licensors.</p>

                <h3 className="termsTitle">Restrictions.</h3>
                <p>You may not: (i) remove any copyright, trademark or other proprietary notices from any portion of the Services; (ii) reproduce, modify, prepare derivative works based upon, distribute, license, lease, sell, resell, transfer, publicly display, publicly perform, transmit, stream, broadcast or otherwise exploit the Services except as expressly permitted by RO Care India; (iii) decompile, reverse engineer or disassemble the Services except as may be permitted by applicable law; (iv) link to, mirror or frame any portion of the Services; (v) cause or launch any programs or scripts for the purpose of scraping, indexing, surveying, or otherwise data mining any portion of the Services or unduly burdening or hindering the operation and/or functionality of any aspect of the Services; or (vi) attempt to gain unauthorized access to or impair any aspect of the Services or its related systems or networks.</p>
            </div>

            {/* <button onClick={handleCart}>london me taxi chalegye</button> */}
{/*             


            // <button onClick={handleOpen}>Open Payment Details</button>
      <PaymentModal 
        open={open} 
        handleClose={handleClose}/> */}
            
            {/* <PaymentModal  /> */}
            {/* <FaqAccordion/> */}
            {/* <Demo /> */}
            {/* <BrandServices/> */}
            {/* <StateLinks/> */}
            {/* <button onClick={handleClickOpen}>Baisc details</button>
            <BasicDetails  open={open} setOpen={setOpen}/> */}
        </div>
    );
}

export default Terms;
