import { Menu } from './menu'

export interface Role {
  id: number
  name: string
  description?: string
  menus: Menu[]
  createTime: string
  updateTime: string
}
