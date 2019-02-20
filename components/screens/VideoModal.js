import React, { Component } from "react";
import {
  SafeAreaView,
  Image,
  Text,
  Button,
  SegmentedControlIOS,
  StyleSheet,
  View,
  ActionSheetIOS,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableHighlight
} from "react-native";
import Orientation from "react-native-orientation-locker";
import VideoScreen from "./VideoScreen"

const { width, height: screenHeight } = Dimensions.get("window");
const height = width * 0.5625;

export default class VideoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false,
      video_url: this.props.item.hd_url,
      modalVisible: false
    };
    this._updatePause = this._updatePause.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    let videoPlayer = this.state.modalVisible ? (
      <VideoScreen navigation={this.state.navigation} video_url={this.state.video_url}/>
    ) : null;
    return (
      <SafeAreaView style={styles.modalContainer}>
        <View style={{ marginTop: 22 }}>
          <Modal
            animationType="fade"
            transparent={false}
            supportedOrientations={["landscape"]}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            {videoPlayer}
          </Modal>
        </View>
        <Text style={styles.title}>{this.props.item.name}</Text>
        <View style={styles.videoContainer}>
          <View style={styles.videoPoster}>
            <Image
              style={{ width: undefined, height: height }}
              source={{ uri: this.props.item.image.screen_url }}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Button
            onPress={() => {
              this._setSegmentArray();
            }}
            title="Quality"
          />
          <Text style={styles.deck}>{this.props.item.deck}</Text>
        </View>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Video", {
                navigation: this.props.navigation,
                video_url: this.state.video_url
              })
            }
          >
            <Text>This is a Button</Text>
          </TouchableOpacity>
          <Button
            title="View Modal"
            onPress={() => {
              this.setModalVisible(true);
            }}
          />
        </View>
        <View style={styles.backButton}>
          <Button
            title="BACK"
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  onLoad(data) {
    console.log("onLoad fired");
  }
  _updatePause() {
    this.setState({
      paused: true
    });
  }
  setPauseState(bool) {
    this.setState({
      paused: bool
    });
  }

  _setSegmentArray() {
    let segment = [];
    segment.push("Cancel");
    this.props.item.hd_url ? segment.push("hd") : null;
    this.props.item.high_url ? segment.push("high") : null;
    this.props.item.low_url ? segment.push("low") : null;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: segment,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex) {
          this.setState({
            video_url: this.props.item[`${segment[buttonIndex]}_url`]
          });
        }
      }
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    color: "white"
  },
  videoContainer: {
    height: height,
    width: undefined
  },
  videoPoster: {
    ...StyleSheet.absoluteFillObject,
    display: "flex",
    justifyContent: "center"
  },
  playIcon: {
    position: "absolute",
    alignSelf: "center"
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#232528",
    flex: 1,
    flexDirection: "column",
    padding: 10
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 16
  },
  deck: {
    color: "white"
  },
  backButton: {
    justifyContent: "flex-end",
    flexGrow: 1
  }
});
