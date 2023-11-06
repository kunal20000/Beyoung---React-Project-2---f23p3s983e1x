import React, { useEffect, useState } from "react";
import { useCheckout } from "../context/CheckoutContext";
import { Button, Grid, TextField } from "@mui/material";

const AddressBox = () => {
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    country: "India",
    zipCode: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    street: false,
    city: false,
    state: false,
    country: false,
    zipCode: false,
  });

  const [disableForm, setDisableForm] = useState(false);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    if (name === "zipCode" && value.length !== 6) {
      setErrors({ ...errors, [name]: true });
    } else if (name === "street" && value.length > 6) {
      setErrors({ ...errors, [name]: true });
    } else if (value.length < 3) {
      setErrors({ ...errors, [name]: true });
    }else{
      setErrors({...errors, [name]: false})
    }

    setAddress({...address, [name]:value})
  };

  const { updateCheckoutAddress } = useCheckout();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!disableForm) {
      if (!Object.values(errors).some((error) => error)) {
        const { name, ...checkOutAdd } = address;
        updateCheckoutAddress(checkOutAdd);
        setDisableForm(true);
      }
    } else {
      updateCheckoutAddress({});
      setDisableForm(false);
    }
  };

  useEffect(() => {
    updateCheckoutAddress({});
  }, []);
  return (
    <div className="addressBox-container">
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="new-address-name"
              label="Name"
              type="text"
              name="name"
              value={address.name}
              onChange={handleChanges}
              variant="outlined"
              required
              fullWidth
              disabled={disableForm}
              error={errors.name}
              helperText={
                errors.name ? "Name must be at least 3 characters long" : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="new-address-street"
              label="Address"
              type="text"
              name="street"
              value={address.street}
              onChange={handleChanges}
              variant="outlined"
              required
              fullWidth
              disabled={disableForm}
              error={errors.street}
              helperText={
                errors.street
                  ? "Address must be at least 6 characters long"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="new-address-city"
              label="City"
              type="text"
              name="city"
              value={address.city}
              onChange={handleChanges}
              variant="outlined"
              required
              fullWidth
              disabled={disableForm}
              error={errors.city}
              helperText={
                errors.city ? "City must be at least 3 characters long" : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="new-address-state"
              label="State"
              type="text"
              name="state"
              value={address.state}
              onChange={handleChanges}
              variant="outlined"
              required
              fullWidth
              disabled={disableForm}
              error={errors.state}
              helperText={
                errors.state ? "State must be at least 3 characters long" : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="new-address-zip"
              label="Zip Code"
              type="number"
              name="zipCode"
              value={address.zipCode}
              inputProps={{ step: "any", inputMode: "none" }}
              onChange={handleChanges}
              variant="outlined"
              required
              fullWidth
              disabled={disableForm}
              error={errors.zipCode}
              helperText={
                errors.zipCode ? "Zip code must be 6 characters long" : ""
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="new-address-country"
              label="Country"
              type="text"
              name="country"
              value={address.country}
              onChange={handleChanges}
              variant="outlined"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%", marginTop: "1rem" }}
              value={disableForm}
            >
              {disableForm ? "Edit address" : "Confirm address"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddressBox;
