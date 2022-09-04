import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants';

export function EmptyPlaceholder({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.primary400,
  },
  message: {
    fontSize: 16,
    color: Colors.gray700,
  },
});
