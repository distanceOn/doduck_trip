import type { NavigateFunction } from 'react-router-dom'

export const goToMarketplace = (navigate: NavigateFunction) => {
  const currentPath = location.pathname
  const newPath = currentPath + '/marketplace'
  navigate(newPath)
}
