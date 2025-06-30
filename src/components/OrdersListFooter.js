import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const OrdersListFooter = ({ loadingMore }) => {
  if (!loadingMore) {
    return null;
  }

  return (
    <View style={styles.footer}>
      <ActivityIndicator size="small" color="#4e73df" />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});

export default OrdersListFooter;