import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { AlertProvider } from './components/Alert';
import { SnackbarProvider } from './components/Snackbar';
import RTL from './layouts/full/shared/customizer/RTL';
import router from './routes/Router';
import { ThemeSettings } from './theme/Theme';
function App() {

  
  const theme = ThemeSettings();
  const { activeDir } = useContext(CustomizerContext);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        retryDelay: 1000,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={activeDir}>
        <QueryClientProvider client={queryClient} >
          <CssBaseline />
          <AlertProvider>
            <SnackbarProvider>
              <RouterProvider router={router} />
            </SnackbarProvider>
          </AlertProvider>
        </QueryClientProvider>
      </RTL>
    </ThemeProvider>
  );
}

export default App
