import React, { useState, useEffect } from "react";
import "./myaddress.css";

const MyAddress = () => {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveAddress = () => {
    // Handle saving the address logic here
   
    console.log("Saved address:", formData);

    // Reset the form data and hide the add address box
    setFormData({
      fullName: "",
      phoneNumber: "",
      pincode: "",
      address: "",
      city: "",
      state: "",
    });
    setShowAddAddress(false);
  };

  const handleCancel = () => {
    // Reset the form data and hide the add address box
    setFormData({
      fullName: "",
      phoneNumber: "",
      pincode: "",
      address: "",
      city: "",
      state: "",
    });
    setShowAddAddress(false);
  };
  return (
    <div className="shipping-address-container">
      <h4>Shipping Address</h4>

      {showAddAddress ? (
        <div className="add-address-box">
          <div className="box1-css">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="box1-css">
            <label htmlFor="phoneNumber">Phone Number*</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              required
              
            />
          </div>
          <div className="box1-css">
            <label htmlFor="pincode">Pincode*</label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="Pincode"
              required
              maxlength="6"
            />
          </div>
          <div className="box1-css">
            <label htmlFor="address">Address*</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              required
            />
          </div>
          <div className="box1-css">
            <label htmlFor="city">City*</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              required
            />
          </div>
          <div className="box1-css">
            <label htmlFor="state">State*</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
              required
            />
          </div>
         <div className="btn-address">
          <button onClick={handleSaveAddress}>SAVE</button>
          <button onClick={handleCancel}>CANCEL</button>
          </div>
        </div>
      ) : (
        <button
          className="btn-forAddress"
          onClick={() => setShowAddAddress(true)}
        >
          + Add New Address
        </button>
      )}
    </div>
  );
};

export default MyAddress;
