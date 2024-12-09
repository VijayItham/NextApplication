import axios from "axios";
import { getToken, getUserId } from "./auth";

const BASE_URL = "https://devrechargeapi.codetrex.in/api";

export const getRequest = async (endpoint) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('response.data', response.data)
  return response.data;
};

export const postRequest = async (endpoint, data) => {
  const response = await axios.post(`${BASE_URL}${endpoint}`, data);
  return response.data;
};

export const postCreate = async (endpoint, data) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const dataWitCreatedBy = {
    ...data,
    createdBy: getUserId(),
  };

  const response = await axios.post(
    `${BASE_URL}${endpoint}`,
    dataWitCreatedBy,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const postUpdate = async (endpoint, data) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const dataWithUpdatedBy = {
    ...data,
    updatedBy: getUserId(),
  };

  const response = await axios.post(
    `${BASE_URL}${endpoint}`,
    dataWithUpdatedBy,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

