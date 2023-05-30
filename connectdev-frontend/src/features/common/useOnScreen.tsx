import { useCallback, useState } from "react"

export default function useOnScreen() {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null)
  const [isIntersecting, setIntersecting] = useState<boolean>(false)
  const measureRef = useCallback((node: HTMLLIElement) => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIntersecting(entry.isIntersecting)
        },
        { root: null, rootMargin: "0px", threshold: 0 },
      )

      observer.observe(node)
      setObserver(observer)
    }
  }, [])
  return { measureRef, isIntersecting, observer }
}
