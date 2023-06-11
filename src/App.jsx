import './App.css';
import Input from './components/Input/Input';
import { useState, useEffect } from 'react';

function App() {
  const [isTrue, setIsTrue] = useState(false);
  const [cep, setCep] = useState('00000000');
  const [estado, setEstado] = useState('');
  const [rua, setRua] = useState('');
  const [ddd, setDdd] = useState('');
  const [dataInfo, setDataInfo] = useState([]);

  const handleChangeCep = ({ target }) => {
    setCep(target.value);
  };

  const handleChangeEstado = ({ target }) => {
    setEstado(target.value);
  };

  const handleChangeRua = ({ target }) => {
    setRua(target.value);
  };

  const handleChangeDdd = ({ target }) => {
    setDdd(target.value);
  };


  const validateCep = (cep) => {
    const cepRegex = /^[0-9]{8}$/;
    return cepRegex.test(cep);
  };

  useEffect(() => {
    if (validateCep(cep)) {
      const url = `https://viacep.com.br/ws/${cep}/json/`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setDataInfo(data);
        })
        .catch(() => {
          alert('Erro ao obter informações do CEP.');
        });
    }
  }, [isTrue, cep]);

  return (
    <>
      <div className='container'>
        <h1>Consumo API CEP</h1>
        <form className='formCep'>
          <Input handleChange={handleChangeCep} type='text' name='cep' textLabel='CEP: ' />
          {isTrue && (
            <>
              <Input value={dataInfo['localidade']} handleChange={handleChangeEstado} type='text' name='estado' textLabel='Estado: ' />
              <Input value={dataInfo['logradouro']} handleChange={handleChangeRua} type='text' name='rua' textLabel='Rua: ' />
              <Input value={dataInfo['ddd']} handleChange={handleChangeDdd} type='text' name='ddd' textLabel='DDD: ' />
            </>
          )}
        </form>
        <button onClick={() => { setIsTrue(true) }}>Enviar</button>
      </div>
    </>
  );
}

export default App;
