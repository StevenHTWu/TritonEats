import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";

const PaymentView = (props) => {
  const { amount, product } = props;

  const onCheckStatus = (response) => {
    props.onCheckStatus(response);
  };

  const htmlContent = `
    <h1> Card Page </h1>
    `;

  const injectedJavaScript = `(function() {
        window.postMessage = function(data){
            window.ReactNativeWebView.postMessage(data);
        };
    })()`;

  const onMessage = (event) => {
    const { data } = event.nativeEvent;
    console.log(data);
  };

  return (
    <WebView
      javaScriptEnabled={true}
      style={{ flex: 1 }}
      originWhitelist={["*"]}
      source={{ html: htmlContent }}
      injectedJavaScript={injectedJavaScript}
      onMessage={onMessage}
    />
  );
};

export { PaymentView };
