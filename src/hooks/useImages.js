import { useState, useEffect } from 'react'
import { getImageId } from '../api/axios'

const useImages = (imageId = 1) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError({})

        const controller = new AbortController()
        const { signal } = controller

        getImageId(imageId, { signal })
            .then(data => {
                setResults(prev => [...prev, ...data])
                setIsLoading(false)
            })
            .catch(e => {
                setIsLoading(false)
                if (signal.aborted) return
                setIsError(true)
                setError({ message: e.message })
            })

        return () => controller.abort()

    }, [imageId])

    return { isLoading, isError, error, results }
}

export default useImages