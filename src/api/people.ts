import { BACKEND_URL } from "../constants";
export const fetchStateWisePeople = async (
  selectedState: number,
  page: number
) => {
  const response = await fetch(
    `${BACKEND_URL}/people/state/${selectedState}?page=${page}&limit=${10}`
  );
  const result = await response.json();
  return result;
};
