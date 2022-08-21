import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "3f86cbb5a29fd53ac293cc7dacbe89ce",
    language: "ko-KR",
  },
});

export default instance;
