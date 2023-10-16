import axios from "axios"
import { getHeaderWithProjectIdAndBody, headerWithProjectIdOnly } from "./getHeader"

export const apiURL = 'https://academics.newtonschool.co/api/v1'


export const getProductsBySearch = async (page, filter)=>{
    const headers = headerWithProjectIdOnly()

    function isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
      }

    let searchFilter = ''
    if ((filter && !isObjectEmpty(filter))) {
        searchFilter = `&search=${JSON.stringify(filter)}`
    }


    try {
        console.log(`${apiURL}/ecommerce/clothes/products?limit=${20}&page=${page}${searchFilter}`)
        const res = await axios.get(
            `${apiURL}/ecommerce/clothes/products?limit=${20}&page=${page}${searchFilter}`,
            headers   
        );

        return res.data.data
    } catch (error) {
        return error
    } 
}

export const getProductById = async (id)=>{
    const headers = headerWithProjectIdOnly();
    const body = getHeaderWithProjectIdAndBody();
    try {
        const res = await axios.get(
            `${apiURL}/ecommerce/product/${id}`,
            headers,
            body
        )
       return res.data.data
        
    } catch (error) {
        return error
    }
}