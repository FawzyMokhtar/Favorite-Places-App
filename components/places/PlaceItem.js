import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants';

export function PlaceItem({ place, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.innerContainer,
          pressed && styles.pressed,
        ]}
        android_ripple={{ color: Colors.primary100 }}
        onPress={onPress}
      >
        <Image style={styles.img} source={{ uri: place.imageUri }} />
        <View style={styles.otherDetailsContainer}>
          <Text style={[styles.text, styles.title]}>{place.title}</Text>
          <Text style={[styles.text, styles.address]}>
            {place.address?.length
              ? place.address
              : 'No address for this place'}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 8,
    backgroundColor: Colors.primary400,
    marginBottom: 12,
    overflow: 'hidden',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  img: {
    flex: 1,
  },
  otherDetailsContainer: {
    flex: 2,
    padding: 16,
  },
  text: {
    color: Colors.primary800,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
  },
  pressed: {
    opacity: 0.75,
  },
});
