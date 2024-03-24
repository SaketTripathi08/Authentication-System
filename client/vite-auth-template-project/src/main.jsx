import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";;

const queryClient = new QueryClient();

const Root = () => {
  return (
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);


