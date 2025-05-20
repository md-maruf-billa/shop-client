export type TUser = {
  _id: string
  name: string
  email: string
  password?: string
  profileImage?: string
  address?: string
  phone?: string
  role: 'admin' | 'user' | 'rider'
  isDeleted?: boolean
  accountStatus?: 'blocked' | 'active'
  needPasswordChange?: boolean
}
