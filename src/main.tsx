import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Repos from './components/Repos.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './router/Home.tsx';




const router = createBrowserRouter ( 
  
  
  
  [
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
    ],
    
  }, 
  {
    path: "/repos/:login", 
    element: <Repos />
   
  
  
  }

  
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
