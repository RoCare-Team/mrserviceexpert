import React, { useEffect, useState } from 'react'
import { data, useLocation, useParams } from 'react-router-dom';

const pageContent = [
    {      
        pageTitle: "RO Service In Delhi- Why Should You Contact Them",
        pageDescription: "In Delhi, receiving uncontaminated and fine water is not easy, but with the succour of the water purifier, you can receive uncontaminated and fine water irrespective to the water source, so receive a technologically advance water purifier and engage pundit service engineers to receive your water purifier service done periodically and appreciate drinking uncontaminated and fine water for the longer duration but before engaging the service engineer to receive your water purifier service done in Delhi to assure that the water purifier service center is expert and pundit. The freshwater nature in Delhi is not safe for drinking purposes because it is highly infected by the several forms of degradation which are potent appreciate to cause different types of deadly diseases, so always secure that you drink uncontaminated and fine water all the time you drink water, and for this, you should have a properly working water purifier at your doorstep in Delhi and to receive this connect the nearest RO water purifier service center Delhi."
    },
    {
        pageTitle: "RO Service Near Me In Delhi- recruit Service Provider From The Nearest Service Center",
        pageDescription: "There are a wide range of RO water purifier service center in Delhi so no matter where you live in Delhi, but you can make a connection with to the well respected RO service contributor of your area and to engage the pundit from the nearest water purifier service center you call for not move everywhere because now you can think your nearest water purifier service center by typing RO service near me in Delhi so pick your phone and think for the RO service center near me in Delhi but while thinking for the same assure that you have accredited your mobile location because this allows your apparatus to track your exact location which succours you to receive the desired result within no time. In Delhi, people do not have much time to visit the water purifier service center, so most of the service contributor offers online listing of the water services, and for this, you can think RO water purifier service near me in Delhi but before you think RO service in Delhi do not forget to enable your apparatus location. Get your RO water purifier service from the authorized service technicians at your doorstep in Delhi.  The RO repair near me has the best water purifier maintenance services to continue its operation. In case your water purifier stops working the RO repair service near me Delhi always stands for you to eliminate all the related issues. Feel free to connect with the RO water filter service near me and provide preventive management for your water purifier."
    },
    {
        pageTitle: "Why RO Installation Is Critical In Delhi?",
        pageDescription: "In Delhi, there is a wide range of RO installation service providers so you can easily contact the nearest water purifier installation service provider but before paying for the same validation to check the RO installation charges of the service provider because RO installation charges are subject to change according to the other services and location so validate to check RO installation charges than only make your final payment. A water purifier is one of the must-have home appliances in Delhi, and Delhi's market is flooded with the various kinds of water purifiers in the market, so the selection of water purifier is quite difficult so if you are looking for the RO installation at your house in Delhi then contact to the nearest RO installation service provider because they do not only guide you with RO installation but they also certify that you buy leading water purifier at your house."
    },
    {
        question: "Best RO AMC Plan For Your Water Purifier",
        ans: "In Delhi, buying an RO annual maintenance service secures that your water purifier will receive proper repair and maintenance services throughout the year that will keep your water purifier efficient and productive, so if you are living in Delhi and concerned about your drinking water nature, then buying RO AMC plan can the top option for you so buy the desirable RO AMC plan for your water purifier and appreciate drinking uncontaminated and fine water at your house in Delhi. A water purifier service store in Delhi offers a wide range of RO AMC plants to the customer so that you can choose the top plan for your water purifier service at your doorstep, but buying an RO AMC is not that simple because there are several plans like what services you call for if you are thinking for the water purifier AMC plan then only buy those plan that meets your call for and requirements."
    }
]

function States() {
    const location = useLocation();
    const { city, category } = useParams(); 
    const [cityName, setCityName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [pageData,setPageData]=useState("");

    useEffect(() => {
        // Set the city values first
        setCityName(city || "");
        setCategoryName(category || "");
        
        
        if (city && category) {
            fetch('http://rocareindia.online/web_api/get_page_data.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    city: city,   
                    cat: category  
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log("Backend Response:", data);
                
                // Set all the state data from the API response
                if (!data.error) {
                    setCityName(data.city_name);
                    setCategoryName(data.category_name);
                    setPageData(data);
                }
            })
            .catch(err => console.error("Error sending data to backend:", err));
            // const bannerImg=data.city_name;
            // console.log(bannerImg);/
            
        }
    }, [city, category]);

    return (
        <div className='common-spacing'>
{/* https://www.mrserviceexpert.com/ */}
{/* <img src={`https://www.mrserviceexpert.com/assets/images${pageData.banner}`} alt={pageData.banner} /> */}
            {pageData?.phone && (
                    <div className="contact-info-heading ">
                        <p>For immediate assistance, call us at: <a href={`tel:${pageData.phone}`} className='text-blue-400'>{pageData.phone}</a></p>
                    </div>
                )}

            <div className='bg-purple-300 common-spacing'>
            {pageData?.cities && (
                <div className="cities-section">
                    <h3>Popular Cities We Serve in</h3>
                    <div className="flex flex-wrap  grid grid-cols-3 gap-6 px-2.5 py-2.5">
                        {pageData.cities.map((city, index) => (
                           <div key={index} className='cities-grid '>
                             <a 
                                key={index} 
                                href={`/${city.city_url}/${category}`} 
                                className="city-link "
                            >
                                {city.city_name}
                            </a>
                            <p className=' text-gray-500'>{city.city_content}</p>
                           </div>
                        ))}
                    </div>
                </div>
            )}

            </div>

            <div>
               
            </div>
            <div className="innerState">
                <h2><b>{cityName}</b> is the best for all the services</h2>
                <p>Services in <b>{categoryName}</b></p>
                <ul>
                    <li>Mr. Service Expert is one of the trusted & emerging name for home appliances repair and service</li>
                    <li>Services at 20% lower price than market</li>
                    <li>Professional, trained and expert technicians</li>
                    <li>100% Satisfaction guaranteed</li>
                    <li>On Time Service at your doorstep</li>
                </ul>
            </div>
            
            <div className="description">
                {pageContent.map((Title, index) => (
                    <div key={index}>
                        <h3 className='descriptionTitle'>{Title.pageTitle}</h3>
                        <p className='descriptionPara'>{Title.pageDescription}</p>
                    </div>
                ))}
            </div>
            
            <div><img src={data.banner} alt={cityName} /></div>
           
        </div>
    )
}

export default States;  