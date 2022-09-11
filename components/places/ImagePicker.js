import { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';

import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';

import { EmptyPlaceholder, FlatButton } from '../ui';

export function ImagePicker({ onImagePicked }) {
  const [cameraPermissionsInfo, requestCameraPermissions] =
    useCameraPermissions();

  const [imageUri, setImageUri] = useState(null);

  async function verifyCameraPermissions() {
    if (cameraPermissionsInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestCameraPermissions();
      return permissionResponse.granted;
    } else if (cameraPermissionsInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Permission is required',
        'You need to grant camera permissions to use the app.'
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyCameraPermissions();
    if (!hasPermission) {
      return;
    }

    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImageUri(result.uri);
    onImagePicked(result.uri);
  }

  return (
    <View>
      {!imageUri && <EmptyPlaceholder message='No image taken yet.' />}

      {imageUri && (
        <View style={styles.imagePreview}>
          <Image
            style={styles.image}
            source={{ uri: imageUri }}
            resizeMode='cover'
          />
        </View>
      )}

      <FlatButton icon='camera' text='Take image' onPress={takeImageHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    height: 200,
  },
  image: {
    flex: 1,
    borderRadius: 8,
  },
});
