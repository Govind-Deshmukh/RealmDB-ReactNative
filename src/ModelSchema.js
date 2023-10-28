import Realm from 'realm';
import {createRealmContext} from '@realm/react';
// Define your object model
class Data extends Realm.Object {
  static schema = {
    name: 'Data',
    properties: {
      _id: 'objectId',
      number: 'int',
    },
    primaryKey: '_id',
  };
}
// Create a configuration object
const realmConfig = {
  schema: [Data],
};
// Create a realm context
const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

export {RealmProvider, useRealm, useObject, useQuery};
