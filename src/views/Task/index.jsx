import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import database from '../../config/firebaseconfig'
import { FontAwesome } from '@expo/vector-icons'
import styles from './style'

export default function Task({ navigation }) {
  const [task, setTask] = useState([])
  
  function deleteTask(id) {
    // pegar a coleção, depois a doc especifica para deletar
    database.collection("Tasks").doc(id).delete()
  }

  useEffect(() => {
    // chamar colecao 
    database.collection("Tasks").onSnapshot((query) => {
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
                    description: item.description
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
        onPress={() => navigation.navigate("NewTask")}
      >
        <Text style={styles.iconButton}>+</Text>
      </TouchableOpacity>
    </View>
  )
}