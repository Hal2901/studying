import { useState, useEffect, useRef } from 'react'

const useMouseover = (intialState: boolean = false) => {
    const [hoverShow, setHoverShow] = useState<boolean>(intialState)
    const ref = useRef<any>(null)

    const handleClickInside = (callback?: () => void) => {
        if (callback) {
            callback()
        }
        setHoverShow(false)
    }
    const handleHover = (e: any) => {
        if (ref.current && ref.current.contains(e.target)) {
            setHoverShow(true)
        } else setHoverShow(false)
    }

    useEffect(() => {
            document.addEventListener('mouseover', handleHover)
        return () => {
                document.removeEventListener('mouseover', handleHover)
        }
    }, [ref, hoverShow])

    return {
        handleClickInside,
        hoverShow,
        setHoverShow,
        ref,
    }
}

export default useMouseover
