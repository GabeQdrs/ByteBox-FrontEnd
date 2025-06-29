import { StyleSheet, View } from 'react-native'

import ProfileInfo from '../components/ProfileInfo'
import CustomHeader from '../components/CustomHeader'
import ProfileTabs from '../routes/profileTabs'


export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <CustomHeader/>
      <ProfileInfo/>
      <ProfileTabs/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1'
  }
})