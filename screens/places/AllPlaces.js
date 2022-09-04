import { StyleSheet, Text, View } from 'react-native';

import { PlacesList } from '../../components';
import { Colors } from '../../constants';

export function AllPlaces() {
  const places = [
    {
      id: 1,
      title: 'Riyadh Saudi Arabia',
      address: 'Near the moon at sky on the universe',
      imageUri:
        'https://media.istockphoto.com/photos/buildingslandmarks-picture-id1293325404',
    },
  ];

  return (
    <>
      {!places.length && (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>
            You don't have any favorite places yet.
          </Text>
        </View>
      )}
      {!!places.length && (
        <View style={styles.container}>
          <PlacesList places={places} />
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
