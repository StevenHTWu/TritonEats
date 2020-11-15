import React, { useState } from "react";
import { Text, StyleSheet, Button, TextInput } from "react-native";

const AuthForm = ({
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText,
  deliverCheck,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_deliverer, setIsDeliverer] = useState("");

  return (
    <>
      <Text>{headerText}</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        style={{ borderWidth: 1 }}
      />
      <TextInput
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        style={{ borderWidth: 1 }}
      />
      {deliverCheck ? (
        <TextInput
          label="Is Deliverer"
          value={is_deliverer}
          onChangeText={setIsDeliverer}
          autoCapitalize="none"
          autoCorrect={false}
          style={{ borderWidth: 1 }}
        />
      ) : null}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Button
        title={submitButtonText}
        onPress={() => onSubmit({ email, password, is_deliverer })}
      />
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
  },
});

export default AuthForm;
