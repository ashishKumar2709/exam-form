import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 1000,
});

/**
 * @param {any} URL
 * @param {any} payload
 */
export async function postRequest(URL, payload) {
  return await instance.post(`/${URL}`, payload);
}

/**
 * @param {any} URL
 */
export async function getRequest(URL) {
  return await instance.get(`/${URL}`);
}

/**
 * @param {any} URL
 * @param {any} payload
 */
export async function putRequest(URL, payload) {
  return await instance.put(`/${URL}`, payload);
}

/**
 * @param {any} URL
 */
export async function deleteRequest(URL) {
  return await instance.delete(`/${URL}`);
}
