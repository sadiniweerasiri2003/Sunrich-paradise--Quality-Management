import React, { useState } from "react";
import axios from "axios"

export default function AddInquiry() {
   
   
    // Define State for Form Inputs
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [inquiryTitle, setInquiryTitle] = useState("");
    const [inquiryBody, setInquiryBody] = useState("");

    // Function to Handle Form Submission
    const sendData = (e) => {
        e.preventDefault();
        const newInquiry = {
            name,
            email,
            inquiryTitle,
            inquiryBody
        };
        axios.post("http://localhost:4000/inquiry/add",newInquiry).then(()=>{
          alert("inqury added")
        }).catch((err)=>{
          alert(err)
        })
    };

    return (
        <div className="container">
            <p>Add a Inquiry</p>

        
                <div className="container">
                <form onSubmit={sendData} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter your name here" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter your email here" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="review" className="form-label">Inquiry Title</label>
                            <textarea className="form-control" id="review" rows="2" placeholder="Enter your inquiry title here" value={inquiryTitle} onChange={(e) => setInquiryTitle(e.target.value)}></textarea>
                        </div>

                        
                        <div className="mb-3">
                            <label htmlFor="inquiryBody" className="form-label">Inquiry Body</label>
                            <textarea className="form-control" id="inquiryBody" rows="5" placeholder="Enter your inquiry body here" value={inquiryBody} onChange={(e) => setInquiryBody(e.target.value)}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
        
        </div>
    );
}