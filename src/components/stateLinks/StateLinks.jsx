import React, { useEffect } from 'react';
import { data, Link, useLocation } from 'react-router-dom';

function StateLinks() {
    const location = useLocation();

    useEffect(() => {
        // Runs every time the URL changes
        console.log("New Path:", location.pathname);

        // Send to backend
        let url= location.pathname;
        fetch('https://ro-customer-care-service.in/webapi/get_page_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url})
        })
        .then(res => res.json())
        .then(data => console.log("Backend Response:", data))
        .catch(err => console.error("Error sending path to backend:", err));
        console.log(data);
        
    }, [location.pathname]);

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
                        to={`/service/ro-service/${city.toLowerCase()}`}
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
