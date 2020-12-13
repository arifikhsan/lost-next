import networkServer from "utils/network/network-server";

export async function getItems() {
  const response = await networkServer.get(`/items`);
  return response.data;
}
