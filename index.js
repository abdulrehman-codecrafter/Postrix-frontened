/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import PostContextProvider from './src/contexts/postsContext';
import AuthContextProvider from './src/contexts/authContext';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function Main() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </PostContextProvider>
    </AuthContextProvider>


  );
}

AppRegistry.registerComponent(appName, () => Main);
