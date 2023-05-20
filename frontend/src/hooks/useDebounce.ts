import { useRef } from 'react'

type argFunction = (...args: any[]) => void

export const useDebounce = <T extends argFunction>(func: T, ms: number) => {
  let timer = useRef<NodeJS.Timeout>()

  return function (...args: any[]) {
    clearInterval(timer.current)
    const functionCall = () => {
      func.apply(func, args)
    }

    timer.current = setTimeout(functionCall, ms)
  }
}
