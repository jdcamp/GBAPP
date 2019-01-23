import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import LatestVideos from "./components/screens/LatestVideos.js";
import VideoModal from "./components/screens/VideoModal.js";
import VideoScreen from "./components/screens/VideoScreen.js";
import CategoriesScreen from "./components/screens/CategoriesScreen.js";
import Shows from "./components/screens/Shows.js";

//Tab pages

//Home screen - latest videos
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Latest",
    header: null
  };
  render() {
    return <LatestVideos />;
  }
}
class Category extends React.Component {
  static navigationOptions = {
    title: "Categories"
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
    return <Shows />;
  }
}
class CategoryTest extends React.Component {
  render() {
    return <CategoriesScreen />;
  }
}
const HomeStack = createStackNavigator({
  Home: CategoryTest,
  Shows: ShowsScreen
});
//Tab nav
const TabStack = createBottomTabNavigator({
  LatestVideos:HomeScreen,
  Categories: {
    screen: Category
  },
  Search:HomeStack
});
//Modals
class ModalScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    console.dir(params)
    const videoItem = params ? params.videoItem : null;
    const navigation = params ? params.navigation : null;
    return <VideoModal item={videoItem} navigation={navigation} />;
  }
}
class VideoModalScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    const navigation = params ? params.navigation : null;
    // const videoItem = params ? params.videoItem : null;
    return <VideoScreen navigation={navigation} />;
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
    mode: "modal",
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
    backgroundColor: "#F5FCFF"
  }
});
