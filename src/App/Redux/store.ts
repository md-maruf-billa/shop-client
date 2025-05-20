import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/user.slice'
import cartReducer from './cart.slice'
import { baseAPI } from './api/baseAPI'
import storage from 'redux-persist/lib/storage'
import languageReducer from './features/languageSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

const persistConfig = {
  key: 'auth',
  storage
}
const CartPersistConfig = {
  key: 'cart',
  storage
}
const LanguagePersistConfig = {
  key: 'language',
  storage
}

const persistedReducer = persistReducer(persistConfig, userReducer)
const cartPersistReducer = persistReducer(CartPersistConfig, cartReducer)
const languagePersistReducer = persistReducer(
  LanguagePersistConfig,
  languageReducer
)

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: persistedReducer,
    cart: cartPersistReducer,
    language: languagePersistReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(baseAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
