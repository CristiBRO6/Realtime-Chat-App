import { BrowserRouter } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';

import UserProvider from '@/providers/UserProvider';

import Toaster from '@/components/Toaster';

import AppRoutes from '@/routes/AppRoutes';
import ThemeProvider from './providers/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <NiceModal.Provider>
        <UserProvider>
          <Toaster />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </UserProvider>
      </NiceModal.Provider>
    </ThemeProvider>
  );
}

export default App;
