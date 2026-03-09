import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import ProductContainer from './containers/ProductContainer/ProductContainer.tsx';
import ProductDetailsPage from './containers/ProductDetailsPage/ProductDetailsPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
