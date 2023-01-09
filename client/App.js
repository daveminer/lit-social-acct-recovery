import * as dotenv from 'dotenv'
dotenv.config()

import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
//import Ceramic from './Ceramic'
import Lit from './Lit'

import { CeramicClient } from '@ceramicnetwork/http-client'

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

    const ceramicDevSeed = randomBytes(32)
    console.log(ceramicDevSeed, 'DEV SEED')

    //const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com')
    //ceramic.authenticateCeramic(ceramicDevSeed)

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
