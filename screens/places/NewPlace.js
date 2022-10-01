import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import {
  ImagePicker,
  Input,
  LocationPicker,
  PrimaryButton,
} from '../../components';
import { Colors } from '../../constants';
import { Database } from '../../utils';

export function NewPlace({ navigation }) {
  const [form, setForm] = useState({
    title: '',
    imageUri: null,
    location: null,
  });

  function titleInputHandler(text) {
    setForm((currentForm) => ({
      ...currentForm,
      title: text,
    }));
  }

  function imageInputHandler(imageUri) {
    setForm((currentForm) => ({
      ...currentForm,
      imageUri,
    }));
  }

  function locationInputHandler(location) {
    setForm((currentForm) => ({
      ...currentForm,
      location,
    }));
  }

  async function saveHandler() {
    if (!form.title.trim() || !form.location) {
      return Alert.alert(
        'Required Data',
        'You must enter the place title.\nAnd pick a location.',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ]
      );
    }

    try {
      await Database.createPlace({
        title: form.title.trim(),
        imageUri: form.imageUri,
        address: form.location.address,
        latitude: form.location.latitude,
        longitude: form.location.longitude,
      });

      navigation.navigate('home');
    } catch (error) {
      return Alert.alert(
        `An error occurred`,
        `Couldn't create the new place.`,
        [{ text: 'Cancel', style: 'cancel' }]
      );
    }
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
        <ImagePicker onImagePicked={imageInputHandler} />
        <LocationPicker
          initialLocation={form.location}
          onLocationPicked={locationInputHandler}
        />
        <PrimaryButton icon='save' text='Add place' onPress={saveHandler} />
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
});
