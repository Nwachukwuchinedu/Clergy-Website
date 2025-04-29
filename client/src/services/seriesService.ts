import api from "./api";
import type { Series, SeriesDetailResponse } from "../types";

// Get all series
export const getAllSeries = async (): Promise<Series[]> => {
  try {
    const response = await api.get("/series");        
    return response.data;
  } catch (error) {
    console.error("Error fetching series:", error);
    throw error;
  }
};

// Get a single series by slug with its teachings
export const getSeriesBySlug = async (
  slug: string
): Promise<SeriesDetailResponse> => {
  try {
    const response = await api.get(`/series/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching series with slug ${slug}:`, error);
    throw error;
  }
};

export default {
  getAllSeries,
  getSeriesBySlug,
};
