import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  Alert,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";

export default class SingleCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //title based on category or title card
    let title = this.props.item.name
      ? this.props.item.name
      : this.props.item.title;
    // let routeParams = this.props.navigation.state.params
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(this.props.route, {
              videoItem: this.props.item,
              navigation: this.props.navigation
            })
          }
        >
          <Image
            source={{
              uri: this.props.item.image.screen_url
            }}
            style={{
              width: undefined,
              height: 250
            }}
          />
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 18,
    elevation: 1,
    backgroundColor: "#555358",
    overflow: "hidden",
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  title: {
    color: "#fff",
    fontSize: 16,
    padding: 12
  }
});
