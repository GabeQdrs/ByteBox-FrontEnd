import api from "./api";

export async function getProducts(currency) {
    try {
        const response = await api.get(`products/${currency}`)
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
export async function getSearchProducts(searchInput,currency) {
  try {
    const response = await api.get(`products/search/${searchInput}/${currency}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getFavorites() {
  try {
    const response = await api.get("products/favorites");
    const products = response.data;
    return products;
  } catch (error) {
    console.error("Erro ao buscar favoritos: " + error);
    throw error;
  }
}