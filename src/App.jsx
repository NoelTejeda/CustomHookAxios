import { useState } from 'react';
import useAxios from './useAxios';

function App() {
  const urlApi = 'http://localhost/api/users/500002874';
  //estado para controlar cuándo se debe disparar la petición http
  const [triggerAxios, setTriggerAxios] = useState(false);
  //desestructuramos lo devuelto por useAxios
  const { isLoading, isError, data } = useAxios(urlApi, triggerAxios);

  const handleClick = () => {
    //se cambia el estado de triggerAxios, provocará que useAxios haga una nueva peticion.
    setTriggerAxios(!triggerAxios);
  };

  return (
    <>
      <button onClick={handleClick}>Fetch Data</button>
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
  );
}

export default App;
