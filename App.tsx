import React from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import { theme } from './src/theme';
import RootNavigator from './src/navigators';
import { NativeBaseProvider } from 'native-base';
import { PaperProvider } from 'react-native-paper';
import { readTasks } from './src/database/api/ReadTasks';
import { database } from './src/database';
import { initializeTaskSummary } from './src/database/api/InitializeTaskSummary';
import { deleteEverythingInDB } from './src/database/api/DeleteAll';
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() !== 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? theme.colors.black : theme.colors.white,
    flex: 1,
  };

  React.useEffect(() => {
    initializeTaskSummary();
    // deleteEverythingInDB();
  }, []);


  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NativeBaseProvider>
        <RootNavigator />
      </NativeBaseProvider>
    </PaperProvider>
  );
}



export default App;
