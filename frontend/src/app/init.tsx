import { Provider } from 'react-redux';

import { store } from './store/index';
import { AuthProvider, I18nProvider } from './providers/Providers';

import App from './App';

const initApp = () => {
  return (
    <I18nProvider>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </I18nProvider>
  );
};

export default initApp;
