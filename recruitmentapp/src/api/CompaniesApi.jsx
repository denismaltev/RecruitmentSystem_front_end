import { config } from "./config.json";
import axios from "axios";

export const putCompanies = ({
    TOKEN,
    PROF_ID,
    name,
    city,
    province,
    country,
    address, 
    phone,
    email,
    isActive
  }) => {
    const options = {
      url: config.BASE_API_URL + "companies/" + PROF_ID,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
     },
      data: {
        id: PROF_ID,
        name: name,
        city: city,
        province: province,
        country : country,
        address : address,
        phone : phone,
        email : email,
        isActive: isActive
      }
    };
    return axios(options);
  };
  