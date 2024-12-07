import React from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import { theme } from './src/theme';
import RootNavigator from './src/navigators';
import { NativeBaseProvider } from 'native-base';
import { PaperProvider } from 'react-native-paper';
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() !== 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? theme.colors.black : theme.colors.white,
    flex: 1,
  };

  return (
    <PaperProvider theme={theme}>
      {/* <GestureHandlerRootView style={styles.container}> */}
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NativeBaseProvider>
          <RootNavigator />
        </NativeBaseProvider>
      {/* </GestureHandlerRootView> */}
    </PaperProvider>
  );
}



export default App;
