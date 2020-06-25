/**
 * @format
 */
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryView from './history/view';
import PrefernceView from './preferences/view';
import TransferView from './transfer/view';
import { Colors } from '../utils';
import Translations from '../utils/translations/en.json';
import { WalletContext } from '../contexts';

const Tabs = createBottomTabNavigator();

const MainView = () => {
	const wallet = useContext(WalletContext);

	return (
		<NavigationContainer>
			<Tabs.Navigator
				initialRoute="history"
				tabBarOptions={{ 
					activeTintColor: Colors.darkgray,
					inactiveTintColor: Colors.white,
					style: styles.tabBar,
				}}>
				<Tabs.Screen
					name="history"
					options={{
						headerStyle: styles.tabHeader,
						tabBarLabel: Translations['tab.history.label'],
						tabBarIcon: ({
							color, 
							size
						}) => (
							<MaterialCommunityIcons
								color={color}
								name="calendar-clock"
								size={size}
							/>
						),
						title: Translations['tab.history.label'],
					}}
				>
					{ props => <HistoryView wallet={wallet} {...props} />}
				</Tabs.Screen>
				<Tabs.Screen
					name="transfers"
					options={{
						headerStyle: styles.tabHeader,
						tabBarLabel: Translations['tab.transfers.label'],
						tabBarIcon: ({ 
							color, 
							size 
						}) => (
							<MaterialCommunityIcons
								color={color}
								name="swap-horizontal"
								size={size}
							/>
						),
						title: Translations['tab.transfer.label'],
					}}
				>
					{ props => <TransferView wallet={wallet} {...props} />}
				</Tabs.Screen>
				<Tabs.Screen
					name="preferences"
					options={{
						headerStyle: styles.tabHeader,
						tabBarLabel: Translations['tab.preferences.label'],
						tabBarIcon: ({ 
							color, 
							size 
						}) => (
							<MaterialCommunityIcons
								color={color}
								name="cogs" 
								size={size} />
						),
						title: Translations['tab.preferences.label'],
					}}
				>
					{ props => <PrefernceView {...props} />}
				</Tabs.Screen>
			</Tabs.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	body: { backgroundColor: Colors.white },
	tabBar: { backgroundColor: Colors.primary },
	tabHeader: {
		backgroundColor: Colors.primary,
		color: Colors.white,
	}
});

export default MainView;
