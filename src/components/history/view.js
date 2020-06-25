/**
 * @format
 */
import React, { useState, useContext } from 'react';
import { 
	ScrollView, 
	StyleSheet,
	View,
} from 'react-native';
import map from 'lodash/map';
import { FormInput } from '../common';
import Translations from '../../utils/translations/en.json';
import {
	Colors,
	Fonts,
} from '../../utils';
 
const renderTransaction = transaction => {
	const {
		sender,
		receipent,
		amount,
		timestamp,
		confirmations,
	} = transaction;

	return (
		<View style={styles.row}>
			<FormInput
				disabled
				label={Translations['history.confirmations.label']}
				style={styles.cell}
				value={confirmations}
			/>
			<FormInput
				disabled
				label={Translations['history.timestamp.label']}
				style={styles.cell}
				value={timestamp}
			/>
			<FormInput
				disabled
				label={Translations['history.amount.label']}
				style={styles.cell}
				value={amount}
			/>
			<FormInput
				disabled
				label={Translations['history.sender.label']}
				style={styles.cell}
				value={sender}
			/>
			<FormInput
				disabled
				label={Translations['history.recipient.label']}
				style={styles.cell}
				value={receipent}
			/>
		</View>
	);
};

const HistoryView = props => {
	const { wallet: { transactions } } = props;

	return (
		<>
			<View style={styles.container}>
				<View style={styles.header}>
				</View>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					{ map(transactions, transaction => renderTransaction) }
				</ScrollView>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {},
	contentContainer: {},
	header: {},
	row: {},
	cell: {},
});

export default HistoryView;
