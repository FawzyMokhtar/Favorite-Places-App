import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants';

export function PrimaryButton({ icon, text, onPress }) {
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
        {icon && (
          <Ionicons
            style={styles.icon}
            name={icon}
            size={24}
            color={Colors.primary400}
          />
        )}
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    marginVertical: 16,
    overflow: 'hidden',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  icon: {
    marginHorizontal: 8,
  },
  text: {
    fontSize: 16,
    color: Colors.primary400,
  },
  pressed: {
    opacity: 0.75,
  },
});
