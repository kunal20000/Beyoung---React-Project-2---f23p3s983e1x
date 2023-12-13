import axios from "axios";
import { getAuthHeaderConfig } from "./getHeader";
import { apiURL } from "./getProductApi";
import { toast } from "react-toastify";

export const addItemToCart = async (id, qty) => {
  const headers = getAuthHeaderConfig();

  try {
    const res = await axios.patch(
      `${apiURL}api/v1/ecommerce/cart/${id}`,
      { quantity: qty },
      headers
    );

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCartItems = async () => {
  const headers = getAuthHeaderConfig();
  try {
    const res = await axios.get(`${apiURL}api/v1/ecommerce/cart/`, headers);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getnumberOfCartItems = async () => {
  try {
    const res = await getCartItems();
    return res.results;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemFromCart = async (id) => {
  const headers = getAuthHeaderConfig();
  try {
    const res = await axios.delete(
      `${apiURL}api/v1/ecommerce/cart/${id}`,
      headers
    );

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateCredentialsAPI = async (body, type) => {
  const headers = getAuthHeaderConfig();

  let requestUrl = apiURL;
  if (type == "password") {
    requestUrl += "api/v1/user/updateMyPassword";
  } else if (type == "username") {
    requestUrl += "api/v1/user/updateme";
  } else {
    toast.error("something went wrong");
    return;
  }

  try {
    const res = await axios.patch(requestUrl, body, headers);

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const clearCart = async () => {
  const headers = getAuthHeaderConfig();
  try {
    const res = await axios.delete(`${apiURL}api/v1/ecommerce/cart/`, headers)
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
