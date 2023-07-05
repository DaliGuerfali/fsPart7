import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { NotifContextProvider } from './context/NotifContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from './context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotifContextProvider>
          <App />
        </NotifContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </Router>
);
