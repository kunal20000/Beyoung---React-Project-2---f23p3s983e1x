import React from "react";
import "./myorder.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

const MyOrdersCards = ({ orderItem }) => {
  const { order } = orderItem;
  const { _id, totalPrice } = order;
  const { name, displayImage } = order.items[0].product;

  return (
    <div className="my-order-card">
      <Stack spacing={2}>
        <Link to={`${_id}`} className="order-card-head">
          <p>
            Order <span>#{_id}</span>
          </p>
          <KeyboardArrowRightIcon />
        </Link>
        <section className="order-card-detail">
          <Link to={`${_id}`}>
            <img src={displayImage} alt={name} />
          </Link>
          <div>
            <Stack sx={{ minWidth: 0 }} justifyContent="space-between">
              <Typography
                sx={{ maxWidth: "100%", fontWeight: 520, color: "#070707" }}
              >
                {name}
              </Typography>

              <div className="order-total-amount">
                <Typography sx={{ fontWeight: 390, display: "inline-block" }}>
                  Amount:
                </Typography>
                &nbsp;&#8377;{totalPrice}
              </div>
            </Stack>
          </div>
        </section>
        <section className="order-status-btn">
          <button
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            Intransit
          </button>
          <button style={{ backgroundColor: "yellow" }}>Need Help?</button>
        </section>
      </Stack>
    </div>
  );
};

export default MyOrdersCards;
