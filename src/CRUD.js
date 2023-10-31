import React, {useState, useEffect} from 'react';
import Realm from 'realm';
import {Button, View, FlatList, StyleSheet, Text} from 'react-native';
import {useRealm} from './ModelSchema';

export default function CRUD() {
  const realm = useRealm();
  const [data, setData] = useState([]);

  const generateEntry = () => {
    realm.write(() => {
      realm.create('Data', {
        _id: Realm.BSON.ObjectId(),
        number: Math.floor(Math.random() * 100) + 1,
      });
    });
    readEntries();
  };

  const readEntries = () => {
    const data = realm.objects('Data');
    console.log('Entries:', data);
    setData(data);
  };

  const updateData = id => {
    if (id) {
      const itemToUpdate = realm.objectForPrimaryKey('Data', id);

      if (itemToUpdate) {
        realm.write(() => {
          itemToUpdate.number = Math.floor(Math.random() * 100) + 1;
        });
      }
      readEntries();
    }
  };

  const deleteData = id => {
    if (id) {
      const itemToDelete = realm.objectForPrimaryKey('Data', id);
      if (itemToDelete) {
        realm.write(() => {
          realm.delete(itemToDelete);
        });
        readEntries();
      }
    }
  };

  useEffect(() => {
    readEntries();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}></View>
      <Button title="Generate Entry" onPress={generateEntry} />
      <FlatList
        data={data}
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text>{item.number}</Text>
            <Button title="Delete" onPress={() => deleteData(item._id)} />
            <Button title="Update" onPress={() => updateData(item._id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});
