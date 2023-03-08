import { PoiClient } from 'client/client';

const client = new PoiClient({
  BASE: process.env.REACT_APP_API_URL || 'http://localhost:5000',
}).default;

export default client;
