import { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

import { MainNavigation } from './navigation';
import { Database } from './utils';

export default function App() {
  const [appPrepared, setAppPrepared] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        await Database.init();

        setAppPrepared(true);
      } catch (error) {}
    }

    prepareApp();
  }, []);

  if (!appPrepared) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style='auto' />
      <MainNavigation />
    </>
  );
}
