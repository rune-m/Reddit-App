import { useState } from "react";
import axios from "axios";

export const useService = (baseUrlProp: string) => {
  const [baseUrl] = useState<string>(baseUrlProp);
  const [token, setToken] = useState<string>("");

  const updateToken = (newToken: string) => {
    console.log("updating token...");
    setToken(`bearer ${newToken}`);
  };

  const getAll = async () => {
    const req = await axios.get(baseUrl);
    return req.data;
  };

  const get = async (id: number) => {
    const req = await axios.get(`${baseUrl}/${id}`);
    return req.data;
  };

  const create = async (obj: any, url: string = "") => {
    const config = { headers: { Authorization: token } };

    const req = await axios.post(baseUrl + url, obj, config);
    console.log(req);
    return req.data;
  };

  const remove = async (id: number) => {
    const config = { headers: { Authorization: token } };

    const req = await axios.delete(`${baseUrl}/${id}`, config);
    return req.data;
  };

  const update = async (id: number, obj: any, actualUrl?: string) => {
    const config = { headers: { Authorization: token } };

    const url = actualUrl ? actualUrl : baseUrl;
    const req = await axios.put(`${url}/${id}`, obj, config);
    return req.data;
  };

  return { getAll, get, create, remove, update, updateToken };
};
