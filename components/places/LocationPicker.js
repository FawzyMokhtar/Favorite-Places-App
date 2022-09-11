import { useEffect, useState } from 'react';

import { Alert, StyleSheet, View } from 'react-native';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';

import { EmptyPlaceholder, FlatButton } from '../ui';
import { MapPreview } from './MapPreview';

export function LocationPicker({ onLocationPicked }) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocussed = useIsFocused();

  const [locationPermissionsInfo, requestLocationPermissions] =
    useForegroundPermissions();

  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (isFocussed && route.params) {
      const pickedLocationFromMap = {
        latitude: route.params.pickedLocation.latitude,
        longitude: route.params.pickedLocation.longitude,
      };

      if (pickedLocationFromMap) {
        setLocation(pickedLocationFromMap);
        onLocationPicked(pickedLocationFromMap);
      }
    }
  }, [route, isFocussed]);

  async function verifyLocationPermission() {
    if (locationPermissionsInfo.status === PermissionStatus.UNDETERMINED) {
      const locationResponse = await requestLocationPermissions();
      return locationResponse.granted;
    } else if (locationPermissionsInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Permission is required',
        'You need to grant location permissions to use the app.'
      );
      return false;
    }

    return true;
  }

  async function locateUserHandler() {
    const hasPermission = await verifyLocationPermission();
    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    const pickedLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setLocation(pickedLocation);
    onLocationPicked(pickedLocation);
  }

  async function pickOnMapHandler() {
    const hasPermission = await verifyLocationPermission();
    if (!hasPermission) {
      return;
    }

    navigation.navigate('map');
  }

  return (
    <View>
      {!location && <EmptyPlaceholder message='No location picked yet.' />}
      {location && (
        <View style={styles.mapPreview}>
          <MapPreview
            latitude={location.latitude}
            longitude={location.longitude}
          />
        </View>
      )}
      <View style={styles.inlineBtnsContainer}>
        <FlatButton
          icon='location'
          text='Current location'
          onPress={locateUserHandler}
        />
        <FlatButton icon='map' text='Pick on Map' onPress={pickOnMapHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    height: 200,
  },
  inlineBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
