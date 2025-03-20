interface IUseCookie<T> {
  value: string | T
  setValue: (value: T) => void
}

export const useCookie = <T>(key: string, initialValue: T, path: string = '/', date: Date = new Date()): IUseCookie<T> => {
  date.setUTCDate(date.getUTCDate() + 1);
  const expires = date.toUTCString()

  const setValue = (value: T) => {
    document.cookie = `${key}=${value}; expires=${expires}; path=${path}`
  }

  const getValue = (name: string): string | null => {
    const cookies = document.cookie.split('; ');
    console.log(cookies)
    for (let cookie of cookies) {
      const [key, value] = cookie.split('=');

      if (key === name)
        return decodeURIComponent(value);
    }

    return null
  }

  const valueCookie = getValue(key)
  const value = valueCookie ? valueCookie : initialValue

  return {value, setValue};
}