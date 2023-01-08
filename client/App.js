import * as dotenv from 'dotenv'
dotenv.config()

import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Lit from './Lit'

export default function App() {
  const [text, onChangeText] = useState('')

  useEffect(() => {
    document.addEventListener(
      'lit-ready',
      function (e) {
        console.log('LIT network is ready')
        //setNetworkLoading(false); // replace this line with your own code that tells your app the network is ready
      },
      false
    )
    Lit.connect()
  })

  const handle = async () => {
    let { encryptedString, encryptedSymmetricKey } = await Lit.encrypt(text)

    // Store the encrypted string on Ceramic

    // let { decryptedString } = await Lit.decrypt(
    //   encryptedString,
    //   encryptedSymmetricKey
    // )

    //console.log(decryptedString, 'DECRYPT')
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <TextInput
        id='encrypt-input'
        onChangeText={onChangeText}
        placeholder='Recovery phrase goes here'
      />
      <button onClick={handle}>Encrypt</button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
