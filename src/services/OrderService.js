import api from './api';

export async function getOrders(token, currency = 'BRL', pageToLoad = 0) {
  try {
    const response = await api.get(`/ws/orders/${currency}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        size: 4,
        page: pageToLoad,
      },
    });

    return {
      orders: response.data.content,
    };
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return { error: error.message };
  }
}
