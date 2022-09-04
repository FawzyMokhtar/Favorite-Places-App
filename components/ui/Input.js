import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants';

export function Input({ label, inputConfig }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...inputConfig} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary400,
  },
  input: {
    height: 48,
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: Colors.primary400,
    color: Colors.gray700,
  },
});
