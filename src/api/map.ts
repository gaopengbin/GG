import axios from "axios";
const key = "fe2d96126118da690340dd17cf652d46";

export const map = {
  geolocation: () => {
    return axios.get("https://restapi.amap.com/v3/ip?key=" + key);
  },
  geocode: (address: string) => {
    return axios.get(
      "https://restapi.amap.com/v3/geocode/geo?key=" + key + "&address=" + address
    );
  },
};
