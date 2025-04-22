import React, { useEffect, useState } from 'react';
import { data, Link, useLocation } from 'react-router-dom';

function StateLinks() {
    const location = useLocation();

    // const [pageData,setPageData]=useState([]);

    // useEffect(() => {
    //     // Runs every time the URL changes
    //     console.log("New Path:", location.pathname);

    //     // Send to backend
    //     let url= location.pathname;
    //     fetch('https://ro-customer-care-service.in/webapi/get_page_data.php', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ url})
    //     })
    //     .then(res => res.json())
    //     .then(data => console.log("Backend Response:", data))
    //     .catch(err => console.error("Error sending path to backend:", err));
    //     console.log(data);
        
    // }, [location.pathname]);

    // useEffect(() => {
    //     // Full pathname
    //     const url = location.pathname;
    
    //     // Extract city name from pathname
    //     const parts = url.split('/');
    //     const city = parts[2];
        
    //     const cat=parts[3];
    //     // parts[0] is '', parts[1] is 'service', parts[2] is city
    
    //     if (city) {
    //         fetch('http://rocareindia.online/web_api/get_page_data.php', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ city,cat })
    //         })
    //         .then(res => res.json())
    //         .then(data => console.log("Backend Response:", data))
    //         .catch(err => console.error("Error sending city to backend:", err));
    //         // setPageData(JSON.stringify(setPageData));
    //         // const display = () =>{
    //         //     // console.log(data.banner);
    //         // }
    //         // const handleFunction=()=>{

    //         // }
    //     }
    // }, [location.pathname]);

    const State = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai',
        'Kolkata', 'Noida', 'Ghaziabad', 'Faridabad', 'Surat', 'Pune',
        'Jaipur', 'Lucknow', 'Kanpur', 'Thane', 'Patna', 'Indore',
        'Bhopal', 'Ranchi', 'Greater Noida', 'Meerut', 'Varanasi',
        'Allahabad', 'Prayagraj', 'Chandigarh'];

    return (
        <div className="ro-service-cities">
            <h2>RO Service in Popular Cities</h2>
            <div className="state-links flex flex-wrap gap-2.5">
                {State.map((city) => (
                    <Link
                        key={city}
                        // /service/:state/ro-water-purifier
                        to={`/service/${city.toLowerCase()}/ro-water-purifier`}
                        className="state-link"
                    >
                        {city}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StateLinks;
