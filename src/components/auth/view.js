/**
 * @format
 */
import React, {
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  Image, 
  ScrollView ,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import gql from 'graphql-tag';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import uuid from 'react-native-uuid';
import {
  FormInput,
  LoadingIndicator,
  SumoButton,
} from '../common';
import MainView from '../main';
import {
  Colors,
  Fonts,
  keys as StorageKeys,
  write as StorageWrite,
} from '../../utils';
import Translations from '../../utils/translations/en.json';
import Images from '@assets/images';
import { WalletContext } from '../../contexts';

const CREATE_USER_WALLET = gql`
    mutation createWallet($passcode: String!, $userId: String!) {
        createWallet(passcode: $passcode, userId: $userId) {
          id
		      userId
          created
          lastOpen
          addresses
          keys {
            public
          }
          transactions {
            amount
            confirmations
            recipient
            sender
            timestamp
          }
        }
    }
`;

const AuthView = () => {
  let wallet = useContext(WalletContext);
  const [ passcode, setPasscode ] = useState();
  const [ created, setCreated ] = useState();
  const client = useApolloClient();
  const [ createWallet, { error, loading } ] = useMutation(CREATE_USER_WALLET, {
    onCompleted({createWallet}) {
      client.writeData({ data: { createWallet } });
      setCreated(createWallet);
      StorageWrite(StorageKeys.USER_ID, createWallet.userId);
    },
    onError(err) {
      console.error(`Error creating wallet: ${err.message}`);
    }
  });

  const handleOnPasscodeChange = val => {
    setPasscode(val)
  }

  const handleOpenWallet = () => {
    console.log(`${passcode} attempted to open wallet`);
  };

  const handleCreateWallet = useCallback(() => {
    createWallet({ variables: { passcode, userId: uuid.v4() } });
  });

  if (loading) {
    return (
      <LoadingIndicator />
    );
  }

  if (created) {
    return (
      <WalletContext.Provider value={created}>
        <MainView />
      </WalletContext.Provider>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.openContainer}>
        <Text style={styles.title}>{Translations['app.title']}</Text>
        <Image source={Images.logo} style={styles.logo} />
        <View style={styles.openForm}>
          <FormInput
            onChangeText={handleOnPasscodeChange}
            maxLength={20}
            placeholder={Translations['wallet.passcode.placeholder']}
            secureTextEntry={true}
          />
          {wallet &&
            <SumoButton
              label={Translations['open.wallet.button']}
              onPress={handleOpenWallet}
              style={styles.openButton}
            />
          }
          {
            !wallet &&
            <SumoButton
              label={Translations['create.wallet.button']}
              onPress={handleCreateWallet}
              style={styles.createButton}
            />
          }
          {
            error && 
              Alert.alert(Translations['error.title.'], error.message)
          }
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: Colors.primary,
    color: Colors.secondary,
		...Fonts.base,
  },
  openButton: {
    backgroundColor: Colors.primary,
    color: Colors.secondary,
    ...Fonts.base,
  },
  openContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 1,
    ...Fonts.body,
    justifyContent: 'space-between',
  },
  openForm: {
    flex: 1,
    paddingTop: '2%',
    width: '80%',
  },
  logo: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    flex: 1,
    resizeMode: 'contain',
    width: '40%',
  },
  title: {
    ...Fonts.loginTitle,
    paddingBottom: 15,
    top: 25,
    zIndex: 1,
  },
});

export default AuthView;
