export interface Menu {
  id: number
  menuName: string
  parentId?: number
  icon?: string
  showStatus: number
  menuUrl?: string
  path?: string
  createTime?: string
  updateTime?: string
  children?: Menu[]
}
