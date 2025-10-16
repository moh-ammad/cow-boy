// services/mauticService.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(
    {
        path: '../.env'
    }
);

const MAUTIC_BASE_URL = process.env.MAUTIC_BASE_URL;
const ACCESS_TOKEN = process.env.MAUTIC_ACCESS_TOKEN;

const mauticRequest = async (endpoint) => {
  try {
    const response = await axios.get(`${MAUTIC_BASE_URL}/api/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      }
    });
    return response.data;
  } catch (error) {
    const msg = error.response?.data || error.message;
    console.error(`❌ Failed to fetch /${endpoint}:`, msg);
    throw msg;
  }
};

export default mauticRequest;
