interface IUseLocalStorage<T> {
  value: T
  setLSValue: (value: T) => void
}

export function useLocalStorage<T>(key: string, initialValue: T): IUseLocalStorage<T> {
  const keyLS = `ADMIN:${key}`

  const valueLS = window.localStorage.getItem(keyLS)
  const value: T = valueLS ? JSON.parse(valueLS) : initialValue

  function setLSValue(value: T): void {
    window.localStorage.setItem(keyLS, JSON.stringify(value))
  }

  return { value, setLSValue }
}