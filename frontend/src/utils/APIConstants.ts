// API Base URL

export const API_BASE = process.env.GATEWAY_PORT ? `${process.env.GATEWAY_BASE_URL}:${process.env.GATEWAY_PORT}` : process.env.GATEWAY_BASE_URL;

// API Root
export const ROOT = '/api';
// API Versions
const V1 = '/v1';

// API Roots
export const ROOT_V1 = ROOT + V1;