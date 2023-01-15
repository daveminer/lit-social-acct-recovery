

import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import Bundlr from './Bundlr'
import Lit from './Lit'

import { EXPO_BUNDLR_PRIVATE_KEY_FILE } from '@env'
//import { EXPO_BUNDLR_PRIVATE_KEY_FILE } from 'react-native-dotenv'

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

    console.log(process.env, "PROCENV")

    const privateKeyFile = EXPO_BUNDLR_PRIVATE_KEY_FILE
    console.log(privateKeyFile, "PKF")
  })

  const handle = async () => {

    const secret = await Lit.encrypt(text)
    const packagedData = JSON.stringify(secret)

    //console.log(Bundlr, "BUN")

    // const ceramicDevSeed = crypto.randomBytes(32)
    // console.log(ceramicDevSeed, 'DEV SEED')

    // const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com')
    // ceramic.authenticateCeramic(ceramicDevSeed)

    //await Ceramic.tryEncrypt()

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
