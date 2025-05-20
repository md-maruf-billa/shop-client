import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { TUser } from '@/Types'

type Tstate = {
  user: TUser | null
  token: string | null
}

const initialState: Tstate = {
  user: null,
  token: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload || {}

      if (!user) {
        console.error('Invalid payload received:', action.payload)
        return
      }

      state.user = user
      if (token) {
        state.token = token
      }
    },
    logout: state => {
      state.user = null
      state.token = null
    }
  }
})

export const { setUser, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.auth.user
export const selectToken = (state: RootState) => state.auth.token

export default userSlice.reducer
