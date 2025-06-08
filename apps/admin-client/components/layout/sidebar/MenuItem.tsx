'use client'

import MenuList from '@/components/layout/sidebar/MenuList'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setSelectedKey } from '@/store/slices/MenuSlice'
import { ChevronUpIcon, ChevronDownIcon, HomeIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

export default function MenuItem({ menuItem, level }: { menuItem: any; level: number }) {
  const isOpened = menuItem?.isOpen ? true : false
  const [isOpen, setIsOpen] = useState(isOpened)
  const router = useRouter()
  const menuList = menuItem.subList
  const hasChildren = menuList && menuList.length > 0
  const paddingLeft = 20 * level
  const dispatch = useDispatch()
  const selectedKey: string = useSelector((state: RootState): any => state.menu.selectedKey)

  const handleClick = () => {
    setIsOpen(!isOpen)
    if (!hasChildren) {
      if (selectedKey === menuItem.id) {
        return
      }
      dispatch(setSelectedKey(menuItem.id))
      console.log('menuItem=', JSON.stringify(menuItem))
      if (menuItem.path) {
        router.push(menuItem.path)
      } else {
        if (menuItem.menuUrl && menuItem.menuUrl.includes('http')) {
          router.push('iframe?iframeUrl=' + menuItem.menuUrl)
        }
      }
    }
  }
  return (
    <div>
      <div
        className={`flex items-center w-full h-12 text-sm
        ${selectedKey === menuItem.id ? 'text-[#79C584]' : 'text-[#BFCBD9]'} 
        ${level === 1 ? 'hover:bg-[#263445]' : 'hover:bg-[#001528]'} 
        ${level === 1 ? 'bg-[#354152]' : 'bg-[#1f2d3d]'} 
        `}
        style={{ paddingLeft: paddingLeft }}
        onClick={handleClick}
      >
        {level === 1 && <HomeIcon className="h-4 w-4 mr-4" />}
        {menuItem.menuName}
        {hasChildren &&
          (isOpen ? (
            <ChevronUpIcon className="w-3 h-3 ml-auto mr-5" />
          ) : (
            <ChevronDownIcon className="w-3 h-3 ml-auto mr-5" />
          ))}
      </div>
      {menuList && isOpen && <MenuList menuList={menuList} level={level} />}
    </div>
  )
}
