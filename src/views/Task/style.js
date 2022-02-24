import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20
  },
  buttonNewTask: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 30,
    left: 20,
    backgroundColor: "#f92e6a",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },  
  iconButton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  }
})

export default styles