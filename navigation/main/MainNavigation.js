import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AllPlaces, NewPlace, PlaceDetails, FullMap } from '../../screens';
import { HeaderRight } from '../../components';
import { Colors } from '../../constants';

const Stack = createNativeStackNavigator();

export function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary500,
          },
          headerTintColor: Colors.gray700,
          headerBackTitleVisible: false,
          contentStyle: {
            backgroundColor: Colors.gray700,
          },
        }}
      >
        <Stack.Screen
          name='home'
          options={{
            title: 'Your Places',
            headerRight: ({ tintColor }) => {
              return <HeaderRight tintColor={tintColor} />;
            },
          }}
          component={AllPlaces}
        />
        <Stack.Screen
          name='new-place'
          options={{
            title: 'New Place',
          }}
          component={NewPlace}
        />
        <Stack.Screen
          name='place-details'
          options={{
            title: 'Place Details',
          }}
          component={PlaceDetails}
        />
        <Stack.Screen
          name='map'
          options={{
            title: 'Map',
          }}
          component={FullMap}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
