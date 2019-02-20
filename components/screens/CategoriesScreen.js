import React from "react";
import VerticleList from "../blocks/VerticleList";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  Alert,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";
import SingleCard from "../SingleCard";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    // this._onPressItem = this._onPressItem.bind(this)
  }
  _onPressItem = videoObj => {
    Alert.alert(videoObj.name, videoObj.deck);
  };
  _keyExtractor = (item, index) => item.guid;
  componentDidMount() {
    return fetch(
      "https://www.giantbomb.com/api/video_shows/?api_key=721720d0999032bf8896fdace3f9cd5f92c4b8f1&format=json&sort=id"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            dataSource: responseJson.results,
            isLoading: false
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={this.state.dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <View>
              <SingleCard
                item={item}
                imageUrl={item.image.screen_url}
                navigation={this.props.navigation}
                route={"Shows"}
                videoTitle={item.title}
              />
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#000F00",
    margin: 10,
    overflow: "hidden",
    backgroundColor: "#696969"
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#1c2122"
  },
  title: {
    color: "#fff",
    fontSize: 16,
    padding: 12
  }
});
export default withNavigation(Categories);
