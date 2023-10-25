import axios from "axios";
import { getAuthHeaderConfig } from "./getHeader";
import { apiURL } from "./getProductApi";

export const addToFavApi = async(body)=>{
   const headers = getAuthHeaderConfig();

   try{
     const res = await axios.patch(`${apiURL}api/v1/ecommerce/wishlist`,
     body,
     headers);
     return res.data
   }catch(err){
    return err.response.data
   }
}
export const getWishlistItems= async()=>{
      const headers = getAuthHeaderConfig();
      try{
       const res = await axios.get(`${apiURL}api/v1/ecommerce/wishlist/`,
       headers)
       return res.data
      }catch(err){
        return err.response.data;
      }
    }

    export const getNumberOfWishlistItems = async()=>{
        try{
          const res = await getWishlistItems();
          return res.results
        }catch(err){
            console.log(err);
        }

    }