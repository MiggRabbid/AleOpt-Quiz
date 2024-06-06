import { Provider } from 'react-redux';

import { store } from './store/index';

import { AuthProvider } from './components/Providers/Providers';
import App from './App';

const initApp = () => {
  console.group('----- initApp');
  console.groupEnd();
  return (
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  );
};

export default initApp;
