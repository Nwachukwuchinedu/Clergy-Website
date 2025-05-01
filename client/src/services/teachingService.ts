import api from "./api";
import type { Teaching, TeachingFilters, TeachingListResponse } from "../types";

// Get teachings with optional filters and pagination
export const getTeachings = async (
  filters?: TeachingFilters,
  page = 1,
  limit = 10
): Promise<TeachingListResponse> => {
  try {
    const response = await api.get("/teachings", {
      params: {
        ...filters,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching teachings:", error);
    throw error;
  }
};

// Get a single teaching by slug
export const getTeachingBySlug = async (slug: string): Promise<Teaching> => {
  try {
    const response = await api.get(`/teachings/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching teaching with slug ${slug}:`, error);
    throw error;
  }
};

// Get related teachings
export const getRelatedTeachings = async (
  teachingId: string,
  limit = 3
): Promise<Teaching[]> => {
  try {
    // Assuming your API has an endpoint for related teachings
    // If not, you can filter client-side using getTeachings()
    const response = await api.get("/teachings", {
      params: {
        relatedTo: teachingId,
        limit,
      },
    });
    return response.data.teachings;
  } catch (error) {
    console.error(`Error fetching related teachings for ${teachingId}:`, error);
    throw error;
  }
};

export default {
  getTeachings,
  getTeachingBySlug,
  getRelatedTeachings,
};
