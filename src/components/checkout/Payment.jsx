import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCheckout } from "../context/CheckoutContext";

const Payment = () => {
  const { updatePaymentValid } = useCheckout();
  const [disableForm, setDisableForm] = useState(false);
  const [errors, setErrors] = useState({
    ccnum: false,
    name: false,
    year: false,
    month: false,
    cvv: false,
  });
  const handleChangePaymentForm = (e) => {
    const { name, value } = e.target;
    if (name === "ccnum" && value.length !== 16) {
      setErrors({ ...errors, [name]: true });
    } else if (name === "month" && value.length !== 2) {
      setErrors({ ...errors, [name]: true });
    } else if (name === "year" && value.length !== 4) {
      setErrors({ ...errors, [name]: true });
    } else if (name === "name" && value.length < 3) {
      setErrors({ ...errors, [name]: true });
    } else if (name === "cvv" && value.length !== 3) {
      setErrors({ ...errors, [name]: true });
    } else {
      setErrors({ ...errors, [name]: false });
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!disableForm) {
      if (!Object.values(errors).some((error) => error)) {
        updatePaymentValid(true);
        setDisableForm(true);
      }
    } else {
      updatePaymentValid(false);
      setDisableForm(false);
    }
  };

  return (
    <div className="cart-items-container payment-container">
      <h5 style={{fontSize:"20px", fontWeight:"500"}}>Enter you Debit/Credit card details</h5>
      <p style={{margin:"0px", fontSize:"18px", fontWeight:"500"}}>We do not store your card details:</p>
      <section className="payment-form">
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Card Number"
                type="number"
                onChange={handleChangePaymentForm}
                required
                variant="outlined"
                fullWidth
                disabled={disableForm}
                error={errors.ccnum}
                helperText={
                  errors.ccnum ? "Card Number must be 16 digit only" : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                type="text"
                name="name"
                onChange={handleChangePaymentForm}
                required
                variant="outlined"
                fullWidth
                disabled={disableForm}
                error={errors.name}
                helperText={
                  errors.name ? "Name must be at least 4 character long" : ""
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="MM"
                type="Number"
                name="month"
                onChange={handleChangePaymentForm}
                required
                variant="outlined"
                fullWidth
                disabled={disableForm}
                error={errors.month}
                helperText={errors.month ? "Month must be 2 digit only" : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="YYYY"
                type="number"
                name="year"
                onChange={handleChangePaymentForm}
                required
                variant="outlined"
                fullWidth
                disabled={disableForm}
                error={errors.year}
                helperText={errors.year ? "Year must be 4 digits only" : ""}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField 
                label="CVV"
                type="number"
                name="cvv"
                onChange={handleChangePaymentForm}
                required
                variant="outlined"
                fullWidth
                disabled={disableForm}
                error={errors.cvv}
                helperText={errors.cvv ? ("CVV must be 3 digits only"):("")}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="outlined"
                sx={{ width: "100%", marginTop: "1rem", backgroundColor:"blue", color:"#fff" }}
              >
                {disableForm ? ("Edit Details"):("Confirm")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </section>
    </div>
  );
};

export default Payment;
