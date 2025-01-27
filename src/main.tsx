import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react';
import { routes } from './routes/routes';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <RouterProvider router={routes}/>
  </StrictMode>
);