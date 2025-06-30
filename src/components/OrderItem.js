import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Assumindo que você tem uma imagem padrão
const DEFAULT_IMAGE = require('../../assets/ImagemLivroTeste.jpg'); // Ajuste o caminho conforme necessário

const OrderItem = ({ item, currency }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const isValidImageUrl = (url) => {
    return typeof url === 'string' && url.trim() !== '' && url !== 'string';
  };

  const formatPrice = (price, currentCurrency) => {
    if (typeof price !== "number" || isNaN(price)) {
      return "R$ 0,00";
    }

    let currencyCode = "BRL";

    if (currentCurrency === 'USD') {
      currencyCode = 'USD';
    } else if (currentCurrency === 'EUR') {
      currencyCode = 'EUR';
    } else {
      currencyCode = 'BRL';
    }

    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const renderProductItem = ({ item: orderProductItem }) => {
    const product = orderProductItem.product || {};
    const imageSource = isValidImageUrl(product.imageUrl)
      ? { uri: product.imageUrl }
      : DEFAULT_IMAGE;

      
    const unitPrice =
      typeof orderProductItem.convertedPriceAtPurchase === "number" &&
      !isNaN(orderProductItem.convertedPriceAtPurchase)
        ? orderProductItem.convertedPriceAtPurchase
        : typeof orderProductItem.priceAtPurchase === "number" &&
          !isNaN(orderProductItem.priceAtPurchase)
        ? orderProductItem.priceAtPurchase
        : 0;

    const itemTotal = unitPrice * (orderProductItem.quantity ?? 0);

    return (
      <View style={styles.productCard}>
        <Image source={imageSource} style={styles.productImage} />

        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>
            {product.theme || product.brand || "Nome do Produto"}
          </Text>

          <Text style={styles.productSubtitle}>
            {product.author || product.genre || "Autor"}
          </Text>

          <Text style={styles.priceUnit}>
            Preço unitário: {formatPrice(unitPrice, currency)}
          </Text>

          <Text style={styles.productQuantity}>
            Quantidade: {orderProductItem.quantity ?? 0}
          </Text>

          <Text style={styles.productPrice}>
            Total do item: {formatPrice(itemTotal, currency)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.orderCard}>
      <Text style={styles.orderId}>Pedido #{item.id}</Text>

      <View style={styles.itemsContainer}>
        {item.items && item.items.length > 0 ? (
          item.items.map((orderItem, index) => (
            <React.Fragment key={`${item.id}-${orderItem.product?.id || index}`}>
              {renderProductItem({ item: orderItem })}
            </React.Fragment>
          ))
        ) : (
          <View style={styles.productCard}>
            <Image source={DEFAULT_IMAGE} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>Nenhum item disponível</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.orderDate}>Data: {formatDate(item.orderDate)}</Text>
        <Text style={styles.orderPrice}>Total do Pedido: {formatPrice(item.totalConvertedPrice, currency)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: '#ECF0F1',
    borderBottomWidth: 1,
    borderColor: '#BDC3C7',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    padding: 10,
  },
  orderId: {
    color: '#2b3e50',
    fontFamily: 'Lora_700Bold',
    fontSize: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  itemsContainer: {
    marginBottom: 10,
  },
  productCard: {
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#ECF0F1",
  },
  productImage: {
    width: "30%",
    height: 120,
    borderRadius: 8,
    resizeMode: "cover",
    marginLeft: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "space-between",
    height: 120,
    paddingVertical: 5,
  },
  productTitle: {
    color: "#2b3e50",
    fontFamily: "Lora_700Bold",
    fontSize: 18,
  },
  productSubtitle: {
    fontFamily: "Lora_600SemiBold",
    fontSize: 14,
    color: "#2b3e50",
    marginTop: 5,
  },
  priceUnit: {
    fontSize: 14,
    color: "#2b3e50",
    marginTop: 5,
    fontFamily: "Lora_400Regular", // Alterado para um peso de fonte mais leve
  },
  productQuantity: {
    fontSize: 14,
    color: "#2b3e50",
    marginTop: 5,
    fontFamily: "Lora_400Regular", // Alterado para um peso de fonte mais leve
  },
  productPrice: {
    color: "#2b3e50",
    fontFamily: "Lora_600SemiBold",
    fontSize: 16, // Um pouco menor que o total do pedido para diferenciar
    marginTop: "auto",
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: '#BDC3C7',
    paddingTop: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 14,
    color: '#6c757d',
  },
  orderPrice: {
    color: '#2b3e50',
    fontFamily: 'Lora_600SemiBold',
    fontSize: 18, // Aumentado para o total do pedido ser mais proeminente
  },
});

export default OrderItem;