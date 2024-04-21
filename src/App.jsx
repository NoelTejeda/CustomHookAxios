import './App.css'
import useAxiosFetch from './useAxiosFetch'
function App() {
  const urlApi = 'http://localhost/api/users/500002874'
  const { isLoading, isError, data } = useAxiosFetch(urlApi)

  return (
    <>
      {isLoading ? <h2>Loading...</h2> : null}
      {isError ? <h2>Error!...</h2> : null}
      {data ? (
        <>
          <h2>name: {data.name}</h2>
          <h2>dueAmount: {data.dueAmount}</h2>
          <h2>invoiceID: {data.invoiceID}</h2>
          <h2>paymentDueDate: {data.paymentDueDate}</h2>
        </>
      ) : null}
    </>
  )
}

export default App
