import { BACKEND_URL } from "../constants";

export const fetchStateDetails = async (stateId: number) => {
  try {
    const response = await fetch(`${BACKEND_URL}/states/${stateId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching people:", error);
    throw error;
  }
};
export const fetchAllStates = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/states`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching people:", error);
    throw error;
  }
};
