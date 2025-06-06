import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TopBar from '../components/CustomHeader'
import SearchBar from '../components/SearchBar'

export default function SearchScreen() {
  return (
    <View>
     <TopBar/>

     <SearchBar/>


    </View>
  )
}
const styles = StyleSheet.create({

})