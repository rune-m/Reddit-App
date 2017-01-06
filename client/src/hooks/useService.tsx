import { useState } from "react";
import axios from "axios";
import { IPost, IPostNew } from "../types/types";

export const useService = (baseUrlProp: string) => {
  const [baseUrl] = useState<string>(baseUrlProp);

  const getAll = async () => {
    const req = await axios.get(baseUrl);
    return req.data;
  };

  const get = async (id: number) => {
    const req = await axios.get(`${baseUrl}/${id}`);
    return req.data;
  };

  const create = async (post: IPostNew) => {
    const req = await axios.post(baseUrl, post);
    return req.data;
  };

  const remove = async (id: number) => {
    const req = await axios.delete(`${baseUrl}/${id}`);
    return req.data;
  };

  const update = async (id: number, post: IPost, actualUrl?: string) => {
    const url = actualUrl ? actualUrl : baseUrl;
    const req = await axios.put(`${url}/${id}`, post);
    return req.data;
  };

  return { getAll, get, create, remove, update };
};
