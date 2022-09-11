import { useState } from 'react';

import { Alert, StyleSheet } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

export function FullMap({ navigation }) {
  const [pickedLocation, setPickedLocation] = useState();

  function pickLocationHandler(event) {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    setPickedLocation({ latitude, longitude });
    confirmPickedLocationHandler();
  }

  function confirmPickedLocationHandler() {
    if (pickedLocation) {
      Alert.alert('Confirm', 'Would you continue with the picked location?', [
        {
          text: 'Yes',
          style: 'default',
          onPress: () => navigation.navigate('new-place', { pickedLocation }),
        },
        {
          text: 'No',
          style: 'destructive',
        },
      ]);
    }
  }

  return (
    <MapView
      style={styles.map}
      showsUserLocation={true}
      followsUserLocation={true}
      onDoublePress={pickLocationHandler}
    >
      {!!pickedLocation && (
        <Marker title='Picked Location' coordinate={{ ...pickedLocation }} />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
