/**
 * @format
 * @flow static-local
 */
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Colors from '../../utils/colors';

const FormInput = props => {
  const { 
	  style, 
	  ...other
	} = props;

	return (
		<TextInput
			selectionColor={Colors.darkblue}
      style={[styles.input, style]}
      {...other}
    />
	);
};

const styles = StyleSheet.create({input: {
    borderColor: Colors.darkgrey,
		borderWidth: StyleSheet.hairlineWidth,
    height: 40,
		margin: 20,
	},});

export default FormInput;
