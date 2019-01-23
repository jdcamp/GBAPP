import React from "react";
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
import VerticleList from "../blocks/VerticleList";

class LatestVideos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    // this._onPressItem = this._onPressItem.bind(this)
  }
  _onPressItem = videoObj => {
    Alert.alert(videoObj.name, videoObj.deck);
  };

  _keyExtractor = (item, index) => item.guid;
  //If live stream url is present shows card at the top of the
  _checkLiveStream = () => {
    return fetch(
      "https://www.giantbomb.com/api/video/current-live/?api_key=721720d0999032bf8896fdace3f9cd5f92c4b8f1"
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState(
          {
            liveSource: responseJson.video,
            isLoading: false
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    return fetch(
      "https://www.giantbomb.com/api/videos/?api_key=721720d0999032bf8896fdace3f9cd5f92c4b8f1&format=json&field_list=name,video_type,image,deck,low_url,guid,hd_url,high_url"
    )
      .then(response => response.json())
      .then(responseJson => {
        this._checkLiveStream();
        this.setState(
          {
            dataSource: responseJson.results
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  getVideos(url, stateDate) {
    return fetch(
      "https://www.giantbomb.com/api/videos/?api_key=721720d0999032bf8896fdace3f9cd5f92c4b8f1&format=json&field_list=name,video_type,image,deck,low_url,guid,hd_url,high_url"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            stateDate: responseJson.results
          },
          function() {}
        );
        console.log("====================================");
        console.log(this.state.stateDate);
        console.log("====================================");
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      //TODO: Render loading animation while fetch request is called
      return <View />;
    }
    return (
      <SafeAreaView style={styles.listContainer}>
        <VerticleList
          iterableData={this.state.dataSource}
          navigation={this.props.navigation}
          route="Modal"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#232528"
  },
  title: {
    color: "#fff",
    fontSize: 16,
    padding: 12
  }
});

export default withNavigation(LatestVideos);
