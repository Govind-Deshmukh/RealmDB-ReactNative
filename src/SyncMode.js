import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {useRealm} from './ModelSchema';

export function SyncMode() {
  const realm = useRealm();

  const [pauseSync, togglePauseSync] = useState(false);

  return (
    <Pressable
      onPress={() => {
        if (
          !pauseSync &&
          realm.syncSession &&
          realm.syncSession.state === 'active'
        ) {
          realm.syncSession.pause();
          togglePauseSync(true);
        } else if (
          pauseSync &&
          realm.syncSession &&
          realm.syncSession.state === 'inactive'
        ) {
          realm.syncSession.resume();
          togglePauseSync(false);
        }
      }}>
      <Icon
        style={styles.icon}
        name={
          realm.syncSession && realm.syncSession.state === 'active'
            ? 'wifi'
            : 'wifi-off'
        }
        type="material"
        tvParallaxProperties={undefined}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {padding: 12},
});
