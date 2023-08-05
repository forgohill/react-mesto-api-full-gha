import { configAuth } from '../utils/constants'

const {
  BASE_URL,
  headers,
  credentials,
  endpoint } = configAuth;
const {
  ENDPOINT_REGISTER,
  ENDPOINT_AUTH,
  ENDPOINT_CHECKJWL,
  ENDPOINT_OUT } = endpoint;

const checkError = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    return Promise.reject(res.status);
  }
}

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}${ENDPOINT_REGISTER}`,
    {
      method: 'POST',
      headers,
      credentials,
      body: JSON.stringify({ password, email })
    }
  )
    .then((response) => {
      return checkError(response);
    })
};

export const authorize = (password, email) => {
  return fetch(
    `${BASE_URL}${ENDPOINT_AUTH}`,
    {
      method: 'POST',
      headers,
      credentials,
      body: JSON.stringify({ password, email })
    })
    .then((response) => {
      return checkError(response);
    })
};

export const checkToken = (token) => {
  return fetch(
    `${BASE_URL}${ENDPOINT_CHECKJWL}`,
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials,
    })
    .then((response) => {
      return checkError(response);
    })
};

export const logout = () => {
  return fetch(
    `${BASE_URL}${ENDPOINT_OUT}`,
    {
      method: 'GET',
      headers,
      credentials,
    }
  ).then((res) => {
    return checkError(res);
  });

}
