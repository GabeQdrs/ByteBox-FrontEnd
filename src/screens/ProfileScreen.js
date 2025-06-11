import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ProfileInfo from '../components/ProfileInfo'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../components/CustomHeader'
import ProfileTabs from '../routes/profileTabs'


export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader/>
      <ProfileInfo/>
      <ProfileTabs/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1'
  }
})