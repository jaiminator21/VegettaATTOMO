import axios from "axios";

export const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",

};

export const API = axios.create({
  baseURL: "https://attomobacked.vercel.app/",
  headers: APIHeaders,
});