import React, { useState, useEffect, useCallback } from "react";
import Tabs from "../../tabs/AllTabs";
import ServicesList from "../../service/ServicesList";
import Cart from "../../cart/Cart";
import Roimg from "../../../assets/images/ro-homepage-banner.png";
import { data, useLocation,useParams } from "react-router-dom";
import FolderList from '../../folderList/FolderList';
import Assurance from "../../Assurance/Assurance";
import ServiceProcedure from '../../serviceProcedure';
import ServiceBanner from '../../../assets/images/RO CARE BANNER 448X251 (1).webp';
import BrandServices from "../../brandServices/BrandServices";
// import ServiceSection from "../../servicesSection/servicesSection";
import AllServicesList from "../../service/ServicesSection";

const servicess = () => {
    const location = useLocation();
    const { state ,brand } = useParams();  // Extract city ,brands from URL
    const formattedState = state ? state.replace("-", " ").toLowerCase() : "Delhi"; 
    const formattedBrands = brand ? brand.replace('-','').toLowerCase() : '';
    // const [selectedServices, setSelectedServices] = useState([]);
    // const [addedServices, setAddedServices] = useState([]); // Track added service IDs
    // const [totalAmount, setTotalAmount] = useState(0);
    // const [cartLoaded, setCartLoaded] = useState(false);
    

   

 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state]);


    return (
        <div className="services-page common-spacing">
            <div className="left-side lg:w-1/4 flex-col mb-1.5">
               <div className="sticky top-20">
               <h3 className="cityHeadings">Most Loved Services by Our Customers!</h3>
               <Tabs />
               </div>
            </div>
            <div className="right-side lg:w-3/4">
                <div className="rightSidePortion justify-center">
                    <div className="lg:w-1/2">
                        <h2 className="ml-2.5 mt-1.5 text-3xl">{formattedBrands} Services All over India</h2>
                        <div className="mb-3.5 flex items-center justify-center ">
                        <img src={ServiceBanner} alt='service img' width={475} height={345} style={{
                            borderRadius:'17px',width:'100%'
                        }}/></div>

                        {/* <ServicesList 
                            // onAddToCart={handleAddToCart} 
                            // handleCartLoading={handleCartLoading}
                            addedServices={addedServices}
                            state={formattedState}
                        /> */}
                        <AllServicesList/>
                    </div>
                    <div className="lg:w-5/12 cartContainer">
                        <div className="cart-body-section">
                           
                            <Assurance />
                            <ServiceProcedure/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default servicess;