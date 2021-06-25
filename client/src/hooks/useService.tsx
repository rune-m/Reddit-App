import { useState } from "react";
import axios from "axios";
import { useUser } from "../state/UserContext";

export const useService = (baseUrlProp: string) => {
  const [baseUrl] = useState<string>(baseUrlProp);
  const [token, setToken] = useState<string>("");

  const { user } = useUser();

  const updateToken = (newToken: string) => {
    console.log("updating token...");
    setToken(`bearer ${newToken}`);
  };

  const getToken = () => {
    return user ? { headers: { Authorization: `bearer ${user.token}` } } : {};
  };

  const getAll = async () => {
    console.log(getToken());
    const req = await axios.get(baseUrl, getToken());
    console.log("Request", req, req.data);
    return req.data;
  };

  const get = async (id: number) => {
    const config = { headers: { Authorization: token } };

    const req = await axios.get(`${baseUrl}/${id}`, config);
    return req.data;
  };

  const create = async (obj: any, url: string = "") => {
    const config = { headers: { Authorization: token } };

    const req = await axios.post(baseUrl + url, obj, config);
    console.log("Request", req, req.data);
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

  return { getAll, get, create, remove, update, updateToken, token };
};
