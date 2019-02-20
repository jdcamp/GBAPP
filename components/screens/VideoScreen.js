import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  SafeAreaView,
  Image,
  Text,
  Button,
  Picker,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity
} from "react-native";
import Video from "react-native-video";
import Icon from "react-native-vector-icons/MaterialIcons";
import Orientation from "react-native-orientation-locker";


const { width, height: screenHeight } = Dimensions.get("window");
const height = width * 0.5625;

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      visibleControls: true,
      seekTime: 0,
      duration: 0,
      showControls: false
    };
    this.onLoad = this.onLoad.bind(this);
    this._handlePauseButton = this._handlePauseButton.bind(this);
    this._showControls = this._showControls.bind(this);

  }

  render() {

    return (
      <View style={styles.container}>
        <Video
          ref={ref => {
            this.player = ref;
          }}
          source={{
            uri: `${
              this.props.video_url
            }?api_key=721720d0999032bf8896fdace3f9cd5f92c4b8f1`
          }}
          onLoad={this.onLoad}
          playInBackground={false}
          resizeMode={"contain"}
          progressUpdateInterval={1000.0}
          onProgress={this._logInterval}
          controls={false}
          ignoreSilentSwitch={"ignore"}
          paused={this.state.paused}
          style={styles.video}
        />

        <View style={styles.controlContainer}>
          <View style={styles.controls}>
            <View style={styles.upperControl}>
              <View style={styles.titleText}>
                <Text numberOfLines={1} style={styles.title}>
                  {this.props.title}
                </Text>
              </View>
              <View style={styles.upperControlButtons}>
                  <Icon name="close" size={30} color="white" onPress={()=>this._closeVideo()}/>
                <Text numberOfLines={1} style={styles.title}>
                  <Icon
                    name="cast"
                    size={15}
                    onPress={() => this.props.rotateFunc()}
                  />{" "}
                  <Icon name="cast" size={15} />
                </Text>
              </View>
            </View>
            <View style={styles.playButton}>
              <Icon
                name={"replay-10"}
                size={30}
                color="white"
                onPress={() => {
                  this._skipTime(-10);
                }}
              />
              <Icon
                name={this.state.paused ? "play-arrow" : "pause"}
                size={33}
                color="white"
                onPress={() => {
                  this._handlePauseButton();
                }}
              />
              <Icon
                name={"forward-10"}
                size={30}
                color="white"
                onPress={() => {
                  this._skipTime(10);
                }}
              />
            </View>
            <View style={styles.lowerControl}>
              <View>
                <Text> Progress Bar </Text>
              </View>
              <View>
                <Text style={styles.progressText}>
                  -{this._formatTime(this.state.duration - this.state.seekTime)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  onLoad(data) {
    this.setState({
      duration: data.duration | 0
    });
    // this.player.presentFullscreenPlayer()
  }
  rotateFunc =() => {
    Orientation.lockToLandscape();

  }
  _logInterval = data => {
    let time = this.state.seekTime;

    this.setState({
      seekTime: data.currentTime | 0
    });
    // console.log("====================================");
    // console.log(this.state.seekTime);
    // console.log("====================================");
  };
  _skipTime(durationTime) {
    let time = this.state.seekTime + durationTime;
    console.log(time);
    // this.setState({
    //   seekTime: time < 0 ? 0 : time
    // });
    this.player.seek(time);
  }
  _handlePauseButton() {
    this.setState({
      paused: !this.state.paused
    });
  }
  _showControls() {
    this.setState({
      showControls: !this.state.showControls
    });
  }
  setPauseState(bool) {
    this.setState({
      paused: bool
    });
  }
  componentWillUnmount() {
    this.setState({
      displayVideo: false
    })
    Orientation.lockToPortrait()
  }
  _formatTime(seconds) {
    let hours = (seconds / 3600) | 0;
    seconds = seconds - hours * 3600;
    let minutes = (seconds / 60) | 0;
    seconds = seconds - minutes * 60;
    return `${hours ? hours + ":" : ""}${("0" + minutes).slice(-2) + ":"}${(
      "0" + seconds
    ).slice(-2)}`;
  }
  _closeVideo() {
    console.log('closeVideo Fired')
    Orientation.lockToPortrait()
    this.props.navigation.goBack(null)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: undefined,
    justifyContent: "center",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "black"
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    transform: [{ rotate: "360deg" }]
  },
  controls: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-between"
  },
  playButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  upperControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 3
  },
  lowerControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 2
  },
  title: {
    color: "white",
    fontSize: 10
  },
  titleTitle: {
    flex: 2
  },
  upperControlButtons: {},
  progressText: {
    color: "white",
    position: "absolute"
  },
  controlContainer: {
    ...StyleSheet.absoluteFillObject
  }
});
