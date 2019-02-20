import React, { Component } from "react";

export const gbListFetch = (foo, bar) => {
  
  let url = `https://www.giantbomb.com/api/`;

  return fetch(
    "https://www.giantbomb.com/api/video/current-live/?api_key=721720d0999032bf8896fdace3f9cd5f92c4b8f1"
  )
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
    })
    .catch(error => {
      console.error(error);
    });
};
