import React, { useEffect, useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import "./singleorder.css";
import { useLoader } from "../context/LoaderContext";
import { getSingleOrderDetails } from "../utils/OrderApi";
const SingleOrder = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState({});
  const navigate = useNavigate();
  const { updateLoaderStatus } = useLoader();
  const { totalPrice, status, orderDate, items, shipmentDetails } =
    orderData || {};
  const { quantity, product } = (items && items[0]) || {};
  const { address } = shipmentDetails || {};
  const userName = localStorage.getItem("username");

  const fetchData = async () => {
    try {
      updateLoaderStatus(true);
      const res = await getSingleOrderDetails(id);
      if (res.status === "success") {
        setOrderData(res.data);
      } else if (res.status === "fail") {
        toast.error("Invalid order id");
        navigate("/myaccount/order");
      } else {
        toast.error("Something went wrong!");
        navigate("/myaccount/order");
      }
    } catch (error) {
    } finally {
      updateLoaderStatus(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  const formateTimeStamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = new Date(timestamp).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const orderTime = formateTimeStamp(orderDate);
  return (
    <div className="order-details-container">
      <Stack spacing={2}>
        <section className="order-details-head">
          Order <h6 style={{ display: "inline-block" }}>#{id}</h6>
        </section>
        <Divider />
        <section className="order-details-productinfo">
          <Link to={`/products/${product?._id}`}>
            <img src={product?.displayImage} alt={product?.name} />
          </Link>
          <div>
            <Stack
              sx={{ minWidth: 0, height: "100%" }}
              justifyContent="space-between"
            >
              <Typography
                sx={{ maxWidth: "100%", fontWeight: 520, color: "#070707" }}
              >
                {product?.name}
              </Typography>

              <div className="order-total-amount">
                <h6 style={{ display: "inline-block" }}>Quantity: </h6>
                {quantity}
              </div>
              <div className="order-total-amount">
                <h6 style={{ display: "inline-block" }}>Price: </h6>
                &#8377;{product?.price}
              </div>
            </Stack>
          </div>
        </section>
        <Divider />
        <section className="order-details-status">
          <button>{status}</button>
          <p>{orderTime}</p>
        </section>
        <Divider />
        <section className="order-details-amount">
          <h6>Total Order Price</h6>
          <h6>&#8377; {totalPrice}</h6>
        </section>
        <Divider />
        <section className="order-details-shipping">
          <h6>Shipping Details</h6>
          <p>{userName}</p>
          <span>{`${address?.street}, ${address?.city}, ${address?.state}, ${address?.zipCode}`}</span>
        </section>
        <Divider />
        <section className="order-details-payment">
          <h6>Payment Method</h6>
          <p>
            <PaymentIcon /> <span> Debit/Credit Card</span>
          </p>
        </section>
        <Divider />
      </Stack>
    </div>
  );
};

export default SingleOrder;
