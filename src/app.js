/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import NavitationContainer from '@react-navigation/native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import Config from 'react-native-config';
import AppContainer from './containers/app';
import { UserContext } from './contexts';
import {
	keys as StorageKeys,
	read as StorageRead,
} from './utils';

const endpoint = (Config.GRAPHQL_ENDPOINT || 'http://localhost:8080' );

const client = new ApolloClient({
	link: new HttpLink({ uri: endpoint }),
	cache: new InMemoryCache(),
});

let userId;
const fetchUserId = async () => {
	userId = await StorageRead(StorageKeys.USER_ID);
};

fetchUserId();

const App = () => {
	return (
		<ApolloProvider client={client}>
			<UserContext.Provider value={userId}>
				<AppContainer />
			</UserContext.Provider>
		</ApolloProvider>
	);
};

export default App;
