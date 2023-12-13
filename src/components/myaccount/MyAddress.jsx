import React, { useState, useEffect } from "react";
import "./myaddress.css";
import { json } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [savedAddresses, setSaveAddresses] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
  useEffect(() => {
    // Load saved addresses from localStorage on component mount
    const savedAddressFromLocalstorage =
      JSON.parse(localStorage.getItem("addresses")) || [];
    setSaveAddresses(savedAddressFromLocalstorage);
  }, []);
  const handleSaveAddress = () => {
    // Handle saving the address logic here

    // validate all field

    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.address ||
      !formData.pincode ||
      !formData.city ||
      !formData.state
    ) {
      toast("Please fill all fields");
      return;
    }

    // Check if the form data has an index property (indicating it's an edited address)
    if (formData.hasOwnProperty("index")) {
      // If it does, update the address at the specified index
      const updatedAddresses = savedAddresses.map((address, index) =>
        index === formData.index ? formData : address
      );
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
      setSaveAddresses(updatedAddresses);
    } else {
      // If not, add the new address to the list
      const updatedAddresses = [...savedAddresses, formData];
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
      setSaveAddresses(updatedAddresses);
    }
    // Save the form data in localStorage
    const updatedAddresses = [...savedAddresses, formData];

    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
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

  const handleEditAddress = (index) => {
    // Set the form data to the selected address for editing
    const selectedAddress = savedAddresses[index];
    setFormData({ ...selectedAddress, index });

    // Show the add address box for editing
    setShowAddAddress(true);
  };
  const handleRemoveAddress = (index) => {
    // Remove the address from the list and update localStorage

    const updatedAddresses = savedAddresses.filter((_, i) => i != index);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setSaveAddresses(updatedAddresses);
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

      {/* Display saved addresses */}
      {savedAddresses.map((address, index) => (
        <div key={index} className="saved-address-box">
          <div className="css-x5bfim">
            <p>{address.fullName}</p>
            <p>{address.address}</p>
            <p>Contact Number: {address.phoneNumber}</p>
            <div className="btn-saved-address">
              <button onClick={() => handleEditAddress(index)}>EDIT</button>
              <button onClick={() => handleRemoveAddress(index)}>DELETE</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAddress;
