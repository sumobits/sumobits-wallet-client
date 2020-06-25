/**
 * @format
 */
import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { LoadingIndicator } from '../components/common';
import { 
	UserContext, 
	WalletContext
} from '../contexts';
import AuthView from '../components/auth/view';

const GET_USER_WALLET_QUERY = gql`
	query getUserWallet($userId: String!) {
		getUserWallet(userId: $userId) {
		  id
		  userId
          passcode
          lastOpen
          transactions {
            amount
            confirmations
            recipient
            sender
            timestamp
          }
          addresses
		}
	}
`;

const AppContainer = () => {
	const userId = useContext(UserContext);

	if (userId && userId.length !== -1) {
		const {
			error,
			data,
			loading,
		} = useQuery(GET_USER_WALLET_QUERY, { variables: { userId: userId } });

		if (loading) {
			return (
				<LoadingIndicator />
			);
		}

		if (error) {
			console.error(`Error encountered fetching from endpoint: ${err.message}`);;
			return;
		}

		return (
			<WalletContext.Provider value={data.getUserWallet}>
				<AuthView />
			</WalletContext.Provider>
		);
	} else {
		return (
			<WalletContext.Provider value={null}>
				<AuthView />
			</WalletContext.Provider>
		);
	}
};

export default AppContainer;
