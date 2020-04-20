import { config } from "./config.json";
import axios from "axios";



export const putCompanies = ({
    TOKEN,
    PROF_ID,
    NAME,
    CITY,
    PROVINCE,
    COUNTRY,
    ADDRESS, 
    PHONE,
    EMAIL,
    IS_ACTIVE
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
        name: NAME,
        city: CITY,
        PROVINCE: PROVINCE,
        country : COUNTRY,
        address : ADDRESS,
        phone : PHONE,
        email : EMAIL,
        isActive: IS_ACTIVE
      }
    };
    console.log(NAME + " " + EMAIL + " " + CITY + " " + PROVINCE + " " + COUNTRY +
    " "+ ADDRESS + PHONE + IS_ACTIVE )
    return axios(options);
  };
  