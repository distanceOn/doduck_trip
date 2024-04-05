import { useEffect, useState } from 'react'

type Searchable<T> = {
  [P in keyof T]: string
}

const useSearch = <T extends object>(
  list: T[],
  searchKeys: Array<keyof Searchable<T>>,
) => {
  const [searchText, setSearchText] = useState('')
  const [filteredItems, setFilteredItems] = useState<T[]>([])

  useEffect(() => {
    const lowerSearchText = searchText.toLowerCase()

    if (searchText && list.length) {
      const filtered = list.filter(item =>
        searchKeys.some(key =>
          item[key].toString().toLowerCase().includes(lowerSearchText),
        ),
      )
      setFilteredItems(filtered)
    } else {
      setFilteredItems(list)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, searchText])

  return { filteredItems, setSearchText }
}

export default useSearch
