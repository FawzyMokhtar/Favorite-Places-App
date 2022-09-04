import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PlaceItem } from './PlaceItem';

export function PlacesList({ places }) {
  const navigation = useNavigation();

  function pressPlaceHandler(placeId) {
    navigation.navigate('place-details', { placeId });
  }

  function placeItemRender(placeItemData) {
    return (
      <PlaceItem
        place={placeItemData.item}
        onPress={pressPlaceHandler.bind(this, placeItemData.item.id)}
      />
    );
  }

  function placeKeyExtractor(place) {
    return place.id;
  }

  return (
    <FlatList
      style={styles.container}
      data={places}
      bounces={false}
      keyExtractor={placeKeyExtractor}
      renderItem={placeItemRender}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
