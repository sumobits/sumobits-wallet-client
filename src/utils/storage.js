/**
 * @format
 */
import AsyncStorage from '@react-native-community/async-storage';

export const keys = {
	USER_ID: 'user_id',
};

export const write = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch(err) {
		console.error(`Error writing to storage: ${err.message}`);
	}
};

export const read = async key => {
	try {
		return await AsyncStorage.getItem(key);
	} catch(err) {
		console.error(`Error reading from storage: ${err.message}`);
	}
};

export const remove = async key => {
	try {
		await AsyncStorage,removeItem(key);
	} catch(err) {
		console.error(`Failed to remove item[${key}] from storage: ${err.message}`);
	}
};
