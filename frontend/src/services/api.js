import axios from 'axios';

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 7000,
});

function logRequestError(error) {
  // eslint-disable-next-line no-console
  console.warn('API request failed', error?.message);
}

export async function safeGet(path, fallback = []) {
  try {
    const { data } = await apiClient.get(path);
    return data;
  } catch (error) {
    logRequestError(error);
    return fallback;
  }
}

export async function safePost(path, payload, fallback) {
  try {
    const { data } = await apiClient.post(path, payload);
    return data;
  } catch (error) {
    logRequestError(error);
    return fallback;
  }
}
