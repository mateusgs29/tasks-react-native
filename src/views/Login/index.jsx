import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'

import firebase from '../../config/firebaseconfig'
import styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Login({ navigation }) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [errorLogin, setErrorLogin] = useState(false)
  
  const loginFirebase = () => {

  }

  useEffect(() => {

  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Task</Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter your email"
        type="text"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput 
        style={styles.input}
        secureTextEntry
        placeholder="Enter your password"
        type="text"
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />
      {errorLogin && (
          <View style={styles.contentAlert}>
            <MaterialCommunityIcons name="alert-circle" size={24} color="#bdbdbd" />
            <Text style={styles.warningAlert}>invalid e-mail or password</Text>
          </View>
      )}
      <TouchableOpacity
        disabled={email === "" || senha === ""}
        style={styles.buttonLogin}
      >
        <Text style={styles.textButtonLogin}>Login</Text>  
      </TouchableOpacity>
      <Text style={styles.registration}>
        dont't have a registration?
        <Text 
          style={styles.linkSubscribe}
          onPress={() => navigation.navigate("NewUser")}
        >
          Subscribe now
        </Text>
      </Text>
    </KeyboardAvoidingView>
  )
}