import { API_URL } from "constants/env";

export const runQuery = async (query, dataField) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  const { data } = await res.json();
  return dataField ? data[dataField] : data;
};
