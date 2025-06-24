import api from "./api";

export async function getProducts(currency) {
    try {
        const response = await api.get(`products/${currency}`)
        return response.data.content;
    } catch (error) {
      console.log("Erro ao buscar produto" + error);
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

export async function createProduct(productToCreate, token) {
  try {
    const response = await api.post("/ws/products", productToCreate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      product: response.data,
      error: null,
    };
  } catch (error) {
    return { error: error.message };
  }
}

export async function updateProduct(id, productToUpdate, token) {
  try {
    const response = await api.put(`/ws/products/${id}`, productToUpdate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      product: response.data,
      error: null,
    };
  } catch (error) {
    return { error: error.message };
  }
}