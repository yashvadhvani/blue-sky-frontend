import { BACKEND_URL } from "../constants";
export const fetchStateWisePeople = async (
  selectedState: number,
  page: number
) => {
  const response = await fetch(
    `${BACKEND_URL}/people/${selectedState}?page=${page}&limit=${10}`
  );
  const result = await response.json();
  return result;
};
