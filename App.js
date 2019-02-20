import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  NavigationEvents
} from "react-navigation";
import LatestVideos from "./components/screens/LatestVideos.js";
import VideoModal from "./components/screens/VideoModal.js";
import VideoScreen from "./components/screens/VideoScreen.js";
import CategoriesScreen from "./components/screens/CategoriesScreen.js";
import Shows from "./components/screens/Shows.js";
import Orientation from 'react-native-orientation-locker'
//Tab pages

//Home screen - latest videos
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Latest",
  };
  render() {
    return <LatestVideos route={"Modal"}/>;
  }
}
class Category extends React.Component {
  static navigationOptions = {
  };
  render() {
    return <CategoriesScreen />;
  }
}
class ShowsScreen extends React.Component {
  static navigationOptions = {
    title: "Shows"
  };
  render() {
    const { params } = this.props.navigation.state;

    return <Shows id={params.videoItem.id}/>;
  }
}
class CategoryTest extends React.Component {
  render() {
    
    return <CategoriesScreen />;
  }
}
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: CategoryTest,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Shows: ShowsScreen
  },
  {
    headerMode: "float"
  }
);
//Tab nav
const TabStack = createBottomTabNavigator({
  LatestVideos:HomeScreen,
  Categories:HomeStack
});
//Modals
class ModalScreen extends React.Component {
  componentDidMount() {
  }
  componentWillUnmount() {
    Orientation.lockToPortrait()
  }
  render() {
    const { params } = this.props.navigation.state;
    const videoItem = params ? params.videoItem : null;
    const navigation = params ? params.navigation : null;

    return <VideoModal item={videoItem} navigation={navigation} />;
  }
}
class VideoModalScreen extends React.Component {

  render() {
    const { params } = this.props.navigation.state;
    const navigation = params ? params.navigation : null;
    const video_url = params ? params.video_url : null;
    const didBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload => {
        Orientation.lockToPortrait()
      }
    );
    // const videoItem = params ? params.videoItem : null;
    return <VideoScreen navigation={navigation} video_url={video_url}/>;
  }
}

TabStack.navigationOptions =  {
  // let { routeName } = navigation.state.routes[navigation.state.index];
  // let headerTitle = routeName;
  // return {
  //   headerTitle
  // };
  header: null
};
//Top level navigator
AppNavigator = createStackNavigator(
  {
    Main: {
      screen: TabStack
    },
    Modal: {
      screen: ModalScreen
    },
    Video: {
      screen: VideoModalScreen
    }
  },
  {
    mode: "card",
    headerMode: "none"
  }
);
AppNavigator.navigationOptions =  {
  // let { routeName } = navigation.state.routes[navigation.state.index];
  // let headerTitle = routeName;
  // return {
  //   headerTitle
  // };
  header: null
};
HomeStack.navigationOptions = {
  // let { routeName } = navigation.state.routes[navigation.state.index];
  // let headerTitle = routeName;
  // return {
  //   headerTitle
  // };
  header: null
};

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  }
});
