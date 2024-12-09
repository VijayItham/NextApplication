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

  return response.data;
};

export const postCreate = async (endpoint, data) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const dataWitCreatedBy = {
    ...data,
    createdBy: getUserId()
  }

  const response = await axios.post(`${BASE_URL}${endpoint}`, dataWitCreatedBy, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postUpdate = async (endpoint, data) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const dataWithUpdatedBy = {
    ...data,
    updatedBy: getUserId()
  }

  const response = await axios.post(`${BASE_URL}${endpoint}`, dataWithUpdatedBy, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const postLoginRequest = async (endpoint, data) => {
  const response = await axios.post(`${BASE_URL}${endpoint}`, data);
  return response.data;
};


export const verifyPinRequest = async (endpoint, pin) => {
  const token = getToken();
  console.log(token)
  if (!token) {
    throw new Error("No token found");
  }

  const requestData = {
    token,
    pin,
  };

  const response = await axios.post(`${BASE_URL}${endpoint}`, requestData);
  return response.data;

};


export const updatePinRequest = async (endpoint, pin) => {
  const token = getToken();
  console.log(token)
  if (!token) {
    throw new Error("No token found");
  }

  const data = {
    token,
    pin,
  };

  const response = await axios.post(`${BASE_URL}${endpoint}`, data);
  return response.data;
};


export const forgotPasswordRequest = async (endpoint, username) => {
  const data = {
    username
  };

  const response = await axios.post(`${BASE_URL}${endpoint}`, data);
  return response.data;
};

export const verifyOtpRequest = async (endpoint, { username, otp }) => {
  const data = {
    username,
    otp,
  };

  const response = await axios.post(`${BASE_URL}${endpoint}`, data);
  return response.data;
};



export const updatePasswordRequest = async (endpoint, { username, password }) => {
  const data = {
    username,
    password
  };

  const response = await axios.post(`${BASE_URL}${endpoint}`, data);
  return response.data;
};

