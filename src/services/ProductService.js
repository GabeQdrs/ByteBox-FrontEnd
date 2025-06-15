import api from "./api";

export async function getProducts() {
    try {
        const response = await api.get("products")
        return response.data;
    } catch (error) {
      console.log("Erro ao buscar produto" + error);
      throw error;
    }
}

export async function setFavorite(productId, newFavoriteStatus) {
  const endpoint = `products/${productId}/favorite/${newFavoriteStatus}`;
  console.log(`[SERVIÇO] Tentando fazer PUT para o endpoint: ${endpoint}`);


  try {
    const response = await api.put(endpoint); 
    console.log('[SERVIÇO] Sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error(`[SERVIÇO] Erro na chamada para ${endpoint}:`, error);
    throw error;
  }
}
export async function getSearchProducts(searchInput) {
  try {
    const response = await api.get(`products/search/${searchInput}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}