import { useState, useEffect, RefObject } from "react"

export default function useTransitionalLargeInput(searchRef: RefObject<HTMLInputElement | null>) {
    const [large, setLarge] = useState<boolean>(false)
    function focusIn() {
        setLarge(true)
    }
    function focusOut() {
        setLarge(false)
    }
    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.addEventListener("focusin", focusIn)
            searchRef.current.addEventListener("focusout", focusOut)
        }
        return () => {
            searchRef.current?.addEventListener("focus", focusOut)
            searchRef.current?.addEventListener("focusin", focusIn)
        }
    }, [])
    return { large };
}