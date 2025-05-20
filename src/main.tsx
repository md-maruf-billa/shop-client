import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import MainRouter from './App/Routes/mainRouter'
import { Provider } from 'react-redux'
import { persistor, store } from './App/Redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={MainRouter} />
        <Toaster visibleToasts={1} position='bottom-right' richColors />
      </PersistGate>

    </Provider>
  </StrictMode>
)
