import { StyleSheet, Text, View } from 'react-native';

export function PlaceDetails({ route }) {
  const placeId = route.params.placeId;

  return (
    <View style={styles.container}>
      <Text>{placeId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
