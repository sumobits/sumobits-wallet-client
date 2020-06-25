/**
 * @format
 */
import React, { useState } from 'react';
import {
	FlatList, 
	StyleSheet, 
	View, 
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SumoButton } from '../common';

const TransactionView = props => {
	const { transactions } = props;
	return (
		<>
			<View style={styles.header}>
				<SumoButton
					containerStyle={styles.transactionTab}
					label={Translations['tab.send.label']}
					onPress={handleTabSwitch}
					style={styles.transationTabButton}
				/>
				<SumoButton
					containerStyle={styles.transactionTab}
					label={Translations['tab.send.label']}
					onPress={handleTabSwitch}
					style={styles.transationTabButton}
				/>
			</View>
			<ScrollView styles={styles.transactionContainer}>

			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	header: {

	},
	transactionTab: {

	}
});

export default HistoryView;
