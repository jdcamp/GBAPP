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
  TouchableOpacity
} from "react-native";

const { width, height: screenHeight } = Dimensions.get("window");
const height = width * 0.5625;

export default class VideoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false,
      video_url: this.props.item.hd_url
    };
    this._updatePause = this._updatePause.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }
  _playVideo = videoURL => {
    this.setState({
      video_url: videoURL,
      showVideo: true
    });
  };

  componentWilllMount() {
    this._setSegmentArray();
  }
  _rotateDisplay() {
    let currentOrientation = Orientation.getOrientation((err, orientation) => {
      orientation == "LANDSCAPE"
        ? Orientation.lockToPortrait()
        : Orientation.lockToLandscape();
    });
  }

  render() {
    let videoPlayer = this.state.showVideo ? (
      <VideoPlayer
        video_url={this.state.video_url}
        title={this.props.item.name}
        rotateFunc={this._rotateDisplay}
      />
    ) : (
      <View style={styles.videoPoster}>
        <Image
          style={{ width: undefined, height: height }}
          source={{ uri: this.props.item.image.screen_url }}
        />
      </View>
    );
    return (
      <SafeAreaView style={styles.modalContainer}>
        <Text style={styles.title}>{this.props.item.name}</Text>
        <View style={styles.videoContainer}>{videoPlayer}</View>
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
                navigation: this.props.navigation
              })
            }
          >
            <Text>This is a Button</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.backButton}>
          <Button
            title="BACK"
            onPress={() => this.props.navigation.goBack(null)}
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
  onFullscreenPlayerWillDismiss(data) {
    console.log("Will diss miss fired");
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
    flexDirection: "column"
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
    flexGrow:1
  }
});
