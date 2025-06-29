import api from "./api";

export async function getProducts(currency) {
    try {
        const response = await api.get(`products/${currency}`,{

        params: {
          size: 10,
          page: 0.3,
        },
      },
      )
        return response.data.content;
    } catch (error) {
      console.log("Erro ao buscar produto" + error);
      throw "Erro ao buscar produtos";
    }
}

export async function getProductById(id, targetCurrency) {
  try {
    const response = await api.get(`/products/${id}/${targetCurrency}`);
    console.log(response.data);
    return {
      product: response.data
    };
  } catch (error) {
    return "Erro ao buscar o produto";
  }
}

export async function getSearchProducts(searchInput,currency) {
  try {
    const response = await api.get(`products/search/${searchInput}/${currency}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao buscar produto" + error);
    throw "Erro ao buscar produtos";
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
    return "Erro ao criar produto";
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
    return "Erro ao atualizar produto";
  }
}

export async function deleteProduct(id, token) {
  try {
    await api.delete(`/ws/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {};
  } catch (error) {
    return { error: error.message };
  }
}