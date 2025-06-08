'use client'

import MenuItem from '@/components/layout/sidebar/MenuItem'

export default function MenuList({ menuList, level }: { menuList: any[]; level: number }) {
  return (
    <div>
      {menuList.map((item) => (
        <MenuItem key={item.id} level={level + 1} menuItem={item}></MenuItem>
      ))}
    </div>
  )
}
