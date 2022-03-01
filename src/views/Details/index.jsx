import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

import database from '../../config/firebaseconfig'
import styles from './style'


export default function Details({ navigation, route }) {
  const [descriptionEdit, setDescriptionEdit] = useState(route.params.description)
  const idTask = route.params.id

  function editTask() {
    database.collection("Tasks").doc(idTask).update({ description: descriptionEdit })
    navigation.navigate("Task")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput 
        style={styles.input}
        placeholder="Ex: estudar javascript"
        onChangeText={setDescriptionEdit}
        value={descriptionEdit}
      />
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => editTask()}
      >
        <Text style={styles.iconButton}>Edit</Text>
      </TouchableOpacity>
    </View>
  )
}