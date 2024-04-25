import axios from 'axios'
import { useEffect, useReducer } from "react"

export default function useAxios(url, trigger) {

  // useReducer para manejar el estado del fetch con tres posibles estados: cargando, éxito y error
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "INIT": //Inicialización antes de hacer la petición
        return {
          ...state,
          isLoading: true,
          isError: false
        }
      case "SUCCESS": //Acción de éxito cuando recibimos la respuesta
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload //Guardamos los datos recibidos
        }
      case "ERROR": //Acción de error en caso de fallo en la petición
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      default: //En caso de una acción desconocida, no cambiamos el estado
    }
  }, {
    isLoading: false, //Estado inicial de carga
    isError: false,   // Estado inicial de error
    data: null        // Estado inicial de los datos
  })

  //useEffect se ejecuta después de cada renderizado del componente
  useEffect(() => {
    if (!url || !trigger) {  //Si no hay URL o trigger, no hacemos nada
      return
    }
    const fetch = async () => {
      dispatch({ type: 'INIT' }) //Iniciamos el estado de carga
      try {
        const result = await axios.get(url) //obtenemos los datos de la URL
        dispatch({ type: 'SUCCESS', payload: result.data }) // Si es exitoso, actualizamos el estado con los datos
      } catch (_) {
        dispatch({ type: 'ERROR' }) //Si hay un error, actualizamos el estado a error
      }
    }
    fetch(url)  //Llamamos a la función fetch con la URL
  }, [url, trigger])  //useEffect se re-ejecutará si cambian la URL o el trigger
  return state  //Devolvemos el estado actual

}
