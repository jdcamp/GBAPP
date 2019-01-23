import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { withNavigation } from "react-navigation";
class VideoScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => {
            this.props.navigation.goBack(null);
          }}
          title="Dismiss"
        />
      </View>
    );
  }
}

export default withNavigation(VideoScreen);
