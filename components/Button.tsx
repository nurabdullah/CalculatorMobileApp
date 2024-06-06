import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const Button = ({
  width,
  h,
  text = '',
  backgroundColor,
  textColor,
  onPress = () => {},
}) => {
  const height = h || width;

  return (
    <View style={[styles.buttonContainer, {width: width, height: height}]}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: backgroundColor}]}
        onPress={() => onPress(text)}>
        <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 7,
  },
  button: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
  },
});

export default Button;
