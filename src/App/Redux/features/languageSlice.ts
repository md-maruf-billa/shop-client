import i18n from '@/i18n'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  language: 'en'
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
      i18n.changeLanguage(action.payload)
    }
  }
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer
