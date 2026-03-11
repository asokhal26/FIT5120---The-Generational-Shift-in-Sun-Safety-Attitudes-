import api from './api';
import { ENDPOINTS } from '../constants/api';

/**
 * Fetch clothing recommendations for a given UV index.
 *
 * Calls GET /api/clothing/?uv_index={uvIndex} on the Flask backend
 * and returns the response data containing matching clothing rules.
 *
 * @param {number} uvIndex - The current UV index value.
 * @returns {Promise<Object>} Resolves with { uv_index, recommendations }.
 * @throws {Error} If the request fails or the backend returns an error.
 */
export async function getClothingRecommendation(uvIndex) {
  const response = await api.get(ENDPOINTS.CLOTHING, {
    params: { uv_index: uvIndex },
  });
  return response.data;
}
