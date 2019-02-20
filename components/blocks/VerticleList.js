import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { withNavigation } from "react-navigation";
import SingleCard from "../SingleCard";

export default class VerticleList extends React.Component {
  constructor(props) {
    super(props);
  }
  _keyExtractor = (item, index) => item.guid;
  render() {
    console.log('props for verticle list');
  
    console.log('props for verticle list');
      return (
          <FlatList
          data={this.props.iterableData}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
              <View>
            <SingleCard
              item={item}
              navigation={this.props.navigation}
              route={this.props.route}
            />
          </View>
        )}
      />
    );
  }
}
const styles = StyleSheet.create({});
