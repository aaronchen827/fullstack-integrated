import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserInfo {
  username?: string
}

interface MenuState {
  selectedKey: string
  userInfo?: UserInfo | null
}

const initialState: MenuState = {
  selectedKey: '',
  userInfo: null,
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedKey(state, action: PayloadAction<string>) {
      state.selectedKey = action.payload
    },
    setUserInfo(state, action: PayloadAction<UserInfo | null>) {
      state.userInfo = action.payload
    },
  },
})

export const { setSelectedKey, setUserInfo } = menuSlice.actions
export default menuSlice.reducer
