export interface User {
  id: number
  username: string
  roleId?: number
  role?: {
    id: number
    name: string
  }
  createTime: string
  updateTime: string
}
