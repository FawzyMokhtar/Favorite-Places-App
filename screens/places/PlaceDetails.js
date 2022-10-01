import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import { MapPreview } from '../../components';
import { Colors } from '../../constants';
import { Database } from '../../utils';

export function PlaceDetails({ navigation, route }) {
  const [place, setPlace] = useState();
  const placeId = route.params.placeId;

  useEffect(() => {
    async function findPlace() {
      try {
        const selectedPlace = await Database.findPlaceById(placeId);
        setPlace(selectedPlace);

        if (!selectedPlace) {
          return Alert.alert(`An error occurred`, `The place is not found.`, [
            { text: 'Cancel', style: 'cancel' },
          ]);
        }

        navigation.setOptions({
          title: selectedPlace.title,
        });
      } catch (error) {
        return Alert.alert(`An error occurred`, `Couldn't load the place.`, [
          { text: 'Cancel', style: 'cancel' },
          { text: 'retry', style: 'default', onPress: findPlace },
        ]);
      }
    }

    if (placeId) {
      findPlace();
    }
  }, [placeId]);

  if (!place) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Place is being loaded...</Text>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.innerContainer}>
        <Image style={styles.img} source={{ uri: place.imageUri }} />
        <View style={styles.otherDetailsContainer}>
          <Text style={[styles.text, styles.address]}>
            {place.address?.length
              ? place.address
              : 'No address for this place'}
          </Text>
        </View>
        <View style={styles.mapPreview}>
          <MapPreview latitude={place.latitude} longitude={place.longitude} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
  },
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: 200,
  },
  otherDetailsContainer: {
    width: '100%',
    padding: 4,
    minHeight: 40,
  },
  text: {
    color: Colors.primary400,
  },
  address: {
    fontSize: 14,
  },
  mapPreview: {
    height: 500,
  },
});
