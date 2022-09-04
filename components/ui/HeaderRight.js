import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants';

export function HeaderRight({ tintColor }) {
  const navigation = useNavigation();

  function createNewHandler() {
    navigation.navigate('new-place');
  }

  return (
    <View style={styles.container}>
      <View style={styles.btnOuterContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.btnInnerContainer,
            pressed && styles.pressedBtn,
          ]}
          android_ripple={{ color: Colors.primary100 }}
          onPress={createNewHandler}
        >
          <Ionicons name='add-circle' size={24} color={tintColor} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnOuterContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  btnInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressedBtn: {
    opacity: 0.75,
  },
});
