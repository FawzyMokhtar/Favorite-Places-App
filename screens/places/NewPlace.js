import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  EmptyPlaceholder,
  FlatButton,
  Input,
  PrimaryButton,
} from '../../components';
import { Colors } from '../../constants';

export function NewPlace() {
  const [form, setForm] = useState({
    title: '',
  });

  function titleInputHandler(text) {
    setForm((currentForm) => ({
      ...currentForm,
      title: text,
    }));
  }

  return (
    <ScrollView
      style={styles.screen}
      bounces={false}
      keyboardDismissMode='interactive'
    >
      <View style={styles.container}>
        <Input
          label='Title'
          inputConfig={{
            value: form.title,
            maxLength: 100,
            autoCorrect: false,
            autoComplete: 'street-address',
            clearButtonMode: 'while-editing',
            placeholder: 'Your place title...',
            placeholderTextColor: Colors.primary100,
            onChangeText: titleInputHandler,
          }}
        />
        <EmptyPlaceholder message='No image taken yet.' />
        <FlatButton icon='camera' text='Take image' />
        <EmptyPlaceholder message='No location picked yet.' />
        <View style={styles.inlineBtnsContainer}>
          <FlatButton icon='location' text='Current location' />
          <FlatButton icon='map' text='Pick on Map' />
        </View>
        <PrimaryButton icon='save' text='Add place' />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 32,
  },
  inlineBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
