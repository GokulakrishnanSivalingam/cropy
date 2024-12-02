import React from "react";

import './Intruction.css';



const Instruction=()=>{

    return(<>

        <div className="first11">

            <h1 className="first1">Welcome to Fresh Farm Products!</h1>

            <p>Welcome to your trusted platform for sourcing locally grown, farm-fresh goods. Whether you're a first-time visitor or a regular user, this guide will help you navigate and make the most of our platform.</p>

        </div>

        <div className="ins2">

            <h1 className="ins1">Navigating the Website</h1>

            <p>

                <ul>

                    <li>Browse Products: Use the navigation bar at the top of the page to explore various categories like:</li>

                    <ul><li>Grains</li>

                    <li>Vegetables</li>

                    <li>Fruits</li>

                    <li>Dairy Products</li>

                    </ul>

                    <li>

                    Search Functionality: Use the search bar to find products quickly by name or category.

                    </li>

                    <li>Locate Nearby Products: Input your region in the location field to view products and sellers near you.</li>

                </ul>

            </p>

        </div>

        <div className="ins2">

            <h1 className="ins1">How to Use the Platform</h1>

            <p><ol>

                <li> Search for Products</li>

                <ul><li>Type the name or category of the product in the search bar.</li>

                <li>View the list of products available near your location.</li>

                </ul>

                <li> View Product Details</li>

                <ul><li>Click on any product to view detailed information, including:</li>

                <ul><li>Products Details</li>

                <li>Availability</li>

                <li>Seller contact details

            </li></ul></ul>

            <li>Contact the Seller</li>

            <ul><li>Once you find a product of interest, use the contact details provided to directly reach out to the seller.</li>

            <li>Discuss availability, pricing, and other details directly with the seller. No intermediaries involved!</li>

            </ul></ol></p>

            </div>

            <div className="ins2">

            <h1 className="ins1">Tips for the Best Experience</h1>

            <p><ul>

                <li>Enter Accurate Location: Ensure your location is correctly entered to display the most relevant products and sellers near you.</li>

                <li>Compare Options: Browse multiple sellers to find the best deals.</li>

                <li>Contact Early: Reach out to sellers early to ensure availability, especially for seasonal or high-demand products.</li>

                <li>Support Local Farmers: Whenever possible, choose local sellers to promote sustainable and community-driven agriculture.</li>

            </ul></p>

        </div>

        <div className="ins2">

            <h1 className="ins1">  Sustainability and Freshness Commitment</h1>

             <p>   <ul>

                    <li>Supporting local farmers and promoting sustainable practices.</li>

                <li>Connecting customers directly with producers to ensure fresh, high-quality goods.</li>

                <li>Encouraging environmentally friendly practices by reducing the need for intermediaries.</li>

                

                </ul></p>

        </div>

        <div className="last1">

                <h1 className="ins1">Need Help? We’ve Got You Covered!</h1>

                <p>

                <ul>

                    <li>FAQs: Visit our FAQ page for answers to common questions.</li>

                    <li>Feedback: Share your suggestions and experiences to help us improve.</li>

                    <li>Thank you for choosing Fresh Farm Products. Enjoy the freshness of local produce at your convenience!</li>

                </ul>

          

                </p>

        </div>

    </>);

}



export default Instruction;