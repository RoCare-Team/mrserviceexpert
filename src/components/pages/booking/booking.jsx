import React, { useState, useEffect } from 'react'
import RoInstallation from '../../../assets/images/serviceBrands/RoInstallation.png';
import Havels from '../../../assets/images/serviceBrands/Havels.jpeg';
import AMC from '../../../assets/images/AMC.jpg';
import PureIT from '../../../assets/images/serviceBrands/PureIT.jpeg';
import Kent from '../../../assets/images/serviceBrands/WaterPurifier.png';
import { Link } from 'react-router-dom';
import PaymentModal from '../../modals/PaymentModal';

function Booking() {
    // Which tab is currently selected
    const [activeTab, setActiveTab] = useState('active');
    // Controls payment modal visibility
    const [open, setOpen] = useState(false);
    // Stores the selected service for the modal
    const [selectedService, setSelectedService] = useState(null);
    const [leadDetails,setLeadDetails]=useState([]);
    
    // All data from localStorage
    const [allLeadData, setAllLeadData] = useState([]);
    // Filtered data based on active tab
    const [filteredData, setFilteredData] = useState([]);



    const getcmpldetls = async(lead_id) => {
        const user_no=lead_id;
        const payload={lead_id:user_no}
        console.log(JSON.stringify(payload));
        
          const res = await fetch("https://waterpurifierservicecenter.in/customer/ro_customer/lead_details.php", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(payload),
          });
      
          const data = await res.json();   
          setLeadDetails(JSON.parse(data));
        setOpen(true)
    };
    
    // Opens modal with the clicked service data
    const handleOpen = (service) => {
        setSelectedService(service);
        setOpen(true);
    };


    const getCmplDtls=async(lead_id)=>{
        const user_no=lead_id;
        const payload={lead_id:user_no}
        console.log(JSON.stringify(payload));
        
          const res = await fetch("https://waterpurifierservicecenter.in/customer/ro_customer/lead_details.php", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(payload),
          });
      
          const data = await res.json();   
          console.log(data);
          

        //   const ldDtls=JSON.parse(data);
        //   console.log(ldDtls);
          
          setSelectedService( data.service_details[0]);
          setOpen(true);

    }
    
    // Closes the modal
    const handleClose = () => setOpen(false);

    // Default images to use if a service doesn't have an image
    const defaultImages = {
        'Water Purifier': Kent,
        'Air Conditioner': AMC,
        'LED TV': PureIT,
        'Fridge': Havels,
        'default': RoInstallation
    };

    // Load data when component first renders
    useEffect(() => {
        try {
            // Get data from localStorage and parse it
            const data = JSON.parse(localStorage.getItem('all_cmpl')) || [];
            setAllLeadData(data);
        } catch (error) {
            console.error("Error loading data from localStorage:", error);
            setAllLeadData([]);
        }
    }, []);

    // Filter data whenever tab changes or data loads
    useEffect(() => {
        if (allLeadData.length > 0) {
            let filtered = [];
            
            // Filter data based on which tab is active
            if (activeTab === 'active') {
                filtered = allLeadData.filter(lead => 
                    lead.status === 'Active' || lead.status === 'Follow-up');
            } 
            else if (activeTab === 'ongoing') {
                filtered = allLeadData.filter(lead => 
                    lead.status === 'Ongoing');
            }
            else if (activeTab === 'complete') {
                filtered = allLeadData.filter(lead => 
                    lead.status === 'Complete' || lead.status === 'Inactive');
            }
            else if (activeTab === 'cancelled') {
                filtered = allLeadData.filter(lead => 
                    lead.status === 'Cancelled' || lead.status === 'Pending-denied');
            }
            
            setFilteredData(filtered);
        }
    }, [activeTab, allLeadData]);

    // Changes the active tab when clicked
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // Gets image for service or uses default
    const getServiceImage = (service) => {
        if (service.image) return service.image;
        
        // If there's a default image for this service type, use it
        if (service.lead_type && defaultImages[service.lead_type]) {
            return defaultImages[service.lead_type];
        }
        
        // Otherwise use generic default
        return defaultImages.default;
    };

    // Gets color for status text
    const getStatusColor = (status) => {
        if (status === 'Complete' || status === 'Inactive') {
            return 'text-green-500';
        }
        else if (status === 'Active' || status === 'Ongoing') {
            return 'text-blue-500';
        }
        else if (status === 'Follow-up') {
            return 'text-yellow-500';
        }
        else if (status === 'Cancelled' || status === 'Pending-denied') {
            return 'text-red-500';
        }
        else {
            return 'text-gray-500';
        }
    };

    return (
        <div className="flex justify-center common-login-spacing flex-col items-center mb-5">
            {/* Breadcrumb navigation */}
            <div className='flex items-start justify-start text-left mb-3 w-1/3'>
                <Link to={'/'} className='mb-0 text-black'><span className='mb-0 text-black'>Home</span></Link>
                <span className="mx-2">/</span>
                <span className="text-purple-600 font-medium">Booking</span>
            </div>

            <div className='bg-white flex flex-col w-full max-w-lg shadow-md rounded-md booking-container'>
                {/* Header section */}
                <div className='mb-4 bg-purple-600 p-4 booking-container'>
                    <h3 className="text-lg font-semibold mb-2 text-white">Active & Upcoming...</h3>
                    <span className='text-white'>
                        {filteredData.length > 0 ? 'You have active bookings.' : 'You have no upcoming bookings.'}
                    </span>
                </div>
                
                <div className="dashedLine"></div>
                
                {/* Booking history section */}
                <div className="previousBookings p-3">
                    <h3 className="text-lg font-semibold mb-3">History</h3>
                    
                    {/* Tab buttons */}
                    <div className="bookingTabs flex gap-2 mb-4 flex-wrap">
                        <button
                            className={` ${activeTab === 'active' ? 'bg-violet-400 tabStyle text-white' : 'tabStyle text-gray-400'}`}
                            onClick={() => handleTabClick('active')}
                        >
                            Active
                        </button>
                        <button
                            className={` ${activeTab === 'ongoing' ? 'bg-violet-400 tabStyle text-white' : 'tabStyle text-gray-400'}`}
                            onClick={() => handleTabClick('ongoing')}
                        >
                            Ongoing
                        </button>
                        <button
                            className={` ${activeTab === 'complete' ? 'bg-violet-400 tabStyle text-white' : 'tabStyle text-gray-400'}`}
                            onClick={() => handleTabClick('complete')}
                        >
                            Complete
                        </button>
                        <button
                            className={` ${activeTab === 'cancelled' ? 'bg-violet-400 tabStyle text-white' : 'tabStyle text-gray-400'}`}
                            onClick={() => handleTabClick('cancelled')}
                        >
                            Cancelled
                        </button>
                    </div>
                    
                    {/* Service cards */}
                    <div className="tabsContent flex flex-col gap-3 max-h-96 overflow-y-auto">
                        {filteredData.length > 0 ? (
                            // If we have data for this tab, show it
                            filteredData.map((service) => (
                                <div 
                                    key={service.lead_id} 
                                    className="tabDetails services-section flex items-center gap-2 border border-gray-200 rounded-md cursor-pointer" 
                                    onClick={() => getCmplDtls(service.lead_id)}
                                >
                                    {/* Service image */}
                                    <div className="w-14 h-14 tabImgService">
                                        <img 
                                            src={getServiceImage(service)} 
                                            alt={service.lead_type || 'Service'} 
                                            className='w-full h-full object-cover rounded' 
                                        />
                                    </div>
                                    
                                    {/* Service details */}
                                    <div className="serviceCard flex-1 flex flex-row justify-between w-full">
                                        <div className="flex flex-col serviceInfo_slot">
                                            <h4 className='font-medium'>
                                                {service.lead_type || 'General Service'} ({service.complain_id})
                                            </h4>
                                            <span className={`bookingStatus ${getStatusColor(service.status)}`}>
                                                Status: {service.status}
                                            </span>
                                        </div>
                                        <div className='flex flex-col text-right'>
                                            <span className="timingDate text-gray-500">
                                                <b>{service.amount ? `₹${service.amount}` : 'Price N/A'}</b>
                                            </span>
                                            <span className="timingDate text-gray-500">
                                                {service.lead_add_date || 'Date N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // If no data for this tab, show empty state
                            <div className="no_booking">
                                <div className="text-center py-4 text-gray-500">
                                    No services in this category
                                </div>
                                <div>
                                    <Link to={'/service/ro-service'}>
                                        <p className='text-xl text-violet-700 mb-3.5 text-center'>
                                            Explore Our Services
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Payment modal */}
            <PaymentModal 
                open={open} 
                handleClose={handleClose} 
                // serviceid={service.complain_id}
                
                serviceDetails={selectedService}

            />
        </div>
    )
}

export default Booking