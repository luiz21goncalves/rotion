import { MagnifyingGlass } from 'phosphor-react'
import { useCallback, useState } from 'react'

import { SearchBar } from '../SearchBar'

export function Search() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setIsSearchBarOpen(isOpen)
  }, [])

  function handleOpenSearchBar() {
    setIsSearchBarOpen(true)
  }

  return (
    <>
      <button
        onClick={handleOpenSearchBar}
        className="flex mx-5 items-center gap-2 text-rotion-100 text-sm hover:text-rotion-50"
      >
        <MagnifyingGlass className="w-5 h-5" />
        Busca rápida
      </button>

      <SearchBar open={isSearchBarOpen} onOpenChange={handleOpenChange} />
    </>
  )
}
