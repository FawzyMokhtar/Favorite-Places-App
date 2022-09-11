import { StyleSheet } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

export function MapPreview({ latitude, longitude }) {
  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <MapView style={styles.map} initialRegion={region} scrollEnabled={false}>
      <Marker coordinate={region} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
