import axios from 'axios'
import { useEffect, useReducer } from "react"

export default function useAxios(url, contractId) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "INIT":
        return {
          ...state,
          isLoading: true,
          isError: false
        }
      case "SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload
        }
      case "ERROR":
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      default:
    }
  }, {
    isLoading: false,
    isError: false,
    data: null
  })

  useEffect(() => {
    if (!url || !contractId) {
      return
    }
    const fetch = async () => {
      dispatch({ type: 'INIT' })
      try {
        const result = await axios.get(url)
        dispatch({ type: 'SUCCESS', payload: result.data })
      } catch (_) {
        dispatch({ type: 'ERROR' })
      }
    }
    fetch(url)
  }, [url, contractId])
  return state
}
