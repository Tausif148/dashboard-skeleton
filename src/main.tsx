// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { CustomizerContextProvider } from './context/CustomizerContext';
import Spinner from './pages/spinner/Spinner';
import { persistor, store } from './redux/store';
import './utils/i18n';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CustomizerContextProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Spinner />}>
            <App />
          </Suspense>
        </QueryClientProvider>
      </CustomizerContextProvider>
    </PersistGate>
  </Provider>
);
