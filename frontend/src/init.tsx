import { Provider } from 'react-redux';

import { store } from './store/index';

import { AuthProvider } from './components/Providers/Providers';
import App from './App';

const initApp = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  );
};

export default initApp;
