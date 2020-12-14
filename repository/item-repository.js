import networkClient from "utils/network/network-client";
import networkServer from "utils/network/network-server";

export async function getItems(params) {
  const response = await networkServer.get("/items", { params });
  return response.data;
}

export async function searchItems(query) {
  const response = await networkClient.get(`/items/search?query=${query}`);
  return response.data;
}
