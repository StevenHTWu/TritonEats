import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";

const PaymentView = (props) => {
  const { amount, product } = props;

  const onCheckStatus = (response) => {
    props.onCheckStatus(response);
  };

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Page</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <script src="https://js.stripe.com/v3/"></script>
      <style>
      
      .StripeElement {
        box-sizing: border-box;
      
        height: 40px;
      
        padding: 10px 12px;
      
        border: 1px solid transparent;
        border-radius: 4px;
        background-color: white;
      
        box-shadow: 0 1px 3px 0 #e6ebf1;
        -webkit-transition: box-shadow 150ms ease;
        transition: box-shadow 150ms ease;
      }
      
      .StripeElement--focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
      }
      
      .StripeElement--invalid {
        border-color: #fa755a;
      }
      
      .StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
      }
      
      </style>
  
  </head>
  <body>
      
    <script src="https://js.stripe.com/v3/"></script>

    <script> var elements = stripe.elements();

    var style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    
    // Create an instance of the card Element.
    var card = elements.create('card', {style: style});
    
    card.mount('#card-element');
    
    // Handle real-time validation errors from the card Element.
    card.on('change', function(event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });</script>

    <form action="/charge" method="post" id="payment-form">
      <div class="form-row">
        <label for="card-element">
          Credit or debit card
        </label>
        <div id="card-element">
          <!-- A Stripe Element will be inserted here. -->
        </div>
    
        <!-- Used to display form errors. -->
        <div id="card-errors" role="alert"></div>
      </div>
    
      <button>Submit Payment</button>
    </form>
  
      
      
  </body>
  </html>
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
