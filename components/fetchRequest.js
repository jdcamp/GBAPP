import React, {
    Component
} from 'react';

export const apiBuilder = (data) => {
        return fetch('https://www.giantbomb.com/api/video/current-live/?api_key=721720d0999032bf8896fdace3f9cd5f92c4b8f1')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          liveSource: responseJson.video,
          isLoading: false,
        }, function () {

        
        })
      })
      .catch((error) => {
        console.error(error);
      })
}