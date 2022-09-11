import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { PlacesList } from '../../components';
import { Colors } from '../../constants';

export function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocussed = useIsFocused();

  useEffect(() => {
    if (isFocussed && route.params?.place) {
      setLoadedPlaces((currentPlaces) => [
        route.params.place,
        ...currentPlaces,
      ]);
    }
  }, [isFocussed, route]);

  return (
    <>
      {!loadedPlaces.length && (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>
            You don't have any favorite places yet.
          </Text>
        </View>
      )}
      {!!loadedPlaces.length && (
        <View style={styles.container}>
          <PlacesList places={loadedPlaces} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsText: {
    fontSize: 16,
    color: Colors.primary400,
  },
});
