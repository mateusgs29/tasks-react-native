import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import firebase from '../../config/firebaseconfig'
import { FontAwesome } from '@expo/vector-icons'
import styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Task({ navigation, route  }) {
  const [task, setTask] = useState([])
  
  const database = firebase.firestore()

  function logout() {
    firebase.auth().signOut()
      .then(() => {
        navigation.navigate("Login")
      }).catch(error => console.log(error))
  }

  function deleteTask(id) {
    // pegar a coleção, depois a doc especifica para deletar
    database.collection(route.params.idUser).doc(id).delete()
  }

  useEffect(() => {
    // chamar colecao 
    database.collection(route.params.idUser).onSnapshot((query) => {
      const list = []
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      });
      setTask(list)
    })
  }, [])

  return (
    <View style={styles.container}>
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={task}
        renderItem={(item) => {
          item = item.item
          return (
            <View style={styles.Tasks}>
              <TouchableOpacity 
                style={styles.deleteTask}
                onPress={() => deleteTask(item.id)}
              >
                <FontAwesome
                  name="star"
                  size={23}
                  color= "#f9236a"
                >
                </FontAwesome>
              </TouchableOpacity>
              <Text
                style={styles.DescriptionTask}
                onPress={() => {
                  navigation.navigate("Details", {
                    id: item.id,
                    description: item.description,
                    idUser: route.params.idUser
                  })
                }}
              >
                {item.description}
              </Text>
            </View>
          )
        }}
      />
      <TouchableOpacity 
        style={styles.buttonNewTask}
        onPress={() => navigation.navigate("NewTask", { idUser: route.params.idUser })}
      >
        <Text style={styles.iconButton}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonLogout} onPress={() => logout()}>
        <Text style={styles.iconButtonLogout}>
          <MaterialCommunityIcons name="location-exit" size={23} color="#f92e6a" />
        </Text>
      </TouchableOpacity>
    </View>
  )
}