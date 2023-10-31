import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {appId, baseUrl} from '../atlasConfig.json';
import {RealmProvider} from './ModelSchema';
import {WelcomeView} from './WelcomeView';
import CRUD from './CRUD';

import {AppProvider, UserProvider} from '@realm/react';

const LoadingIndicator = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default function Main() {
  return (
    <AppProvider appId={appId} baseUrl={baseUrl}>
      <UserProvider fallbackComponent={WelcomeView}>
        <RealmProvider
          sync={{
            flexible: true,
            onError: (_, error) => {
              console.error(error);
            },
          }}
          fallbackComponent={LoadingIndicator}>
          <View>
            <CRUD />
          </View>
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}

const styles = {
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
