import React from 'react';
import {View, Text} from 'react-native';
import {appId, baseUrl, dataExplorerLink} from '../atlasConfig.json';
import {RealmProvider} from './ModelSchema';
import {WelcomeView} from './WelcomeView';
import CRUD from './CRUD';

import {AppProvider, UserProvider} from '@realm/react';

export default function Main() {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={WelcomeView}>
        <RealmProvider>
          <View>
            <CRUD />
          </View>
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
