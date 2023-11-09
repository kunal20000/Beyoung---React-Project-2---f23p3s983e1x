import React, { useEffect, useState } from "react";
import { useLoader } from "../context/LoaderContext";
import axios from "axios";
import { getOrderHistory } from "../utils/OrderApi";
import MyOrdersCards from "./MyOrdersCards";
import NoOrderGif from "../asset/no-orders.gif";
import "./myorder.css";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const { updateLoaderStatus } = useLoader();

  const fetchOrder = async () => {
    try {
      updateLoaderStatus(true);
      const res = await getOrderHistory();
      console.log("orders", res);
      if (res.status === "success") {
        setOrders(res.data.reverse());
      }
    } catch (err) {
      console.log(err);
    } finally {
      updateLoaderStatus(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="my-order-container">
      {orders.length === 0 ? (
        <img
          style={{ width: "70%", margin: "0 auto" }}
          src="https://beyoung-project.vercel.app/static/media/no-orders.3d41c9015fecbdab3ebd.gif"
          alt="no-orders"
        />
      ) : (
        <div className="my-orders-container">
          {orders.map((order, i) => (
            <MyOrdersCards key={i} orderItem={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
