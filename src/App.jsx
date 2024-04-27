import { useState } from 'react';
import useAxios from './useAxios';

function App() {
  const [contractId, setContractId] = useState('')
  const [urlApi, setUrlApi] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { isLoading, isError, data } = useAxios(urlApi, contractId)

  const handleClick = () => {
    setUrlApi(`http://localhost/api/users/${contractId}`);
    setIsButtonClicked(true);
  }

  const changeInput = (e) => {
    setContractId(e.target.value)
  }

  return (
    <>
      <input type="text" onChange={changeInput} value={contractId} />
      <button onClick={handleClick} disabled={contractId.length < 9}>Consultar</button>
      {isLoading ? <h2>Loading...</h2> : null}
      {isError ? <h2>Error!...</h2> : null}
      {isButtonClicked ? (
        data ? (
          <>
            <h2>name: {data.name}</h2>
            <h2>dueAmount: {data.dueAmount}</h2>
            <h2>invoiceID: {data.invoiceID}</h2>
            <h2>paymentDueDate: {data.paymentDueDate}</h2>
          </>
        ) : <h2>Usuario no es postpago</h2>
      ) : null}
    </>
  );
}

export default App;
