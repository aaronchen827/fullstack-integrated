// utils/menu.ts
export function findPathToNode(menuList: any[], pathname: string, path: any[] = []): any[] | null {
  for (const item of menuList) {
    const newPath = [...path, item]
    if (item.path === pathname) {
      return newPath
    }
    if (item.subList && item.subList.length > 0) {
      const result = findPathToNode(item.subList, pathname, newPath)
      if (result) return result
    }
  }
  return null
}
