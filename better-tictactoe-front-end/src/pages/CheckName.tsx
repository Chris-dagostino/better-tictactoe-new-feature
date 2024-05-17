import React, { useEffect, useState } from 'react';
import { BaseResponse } from '../interfaces';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/CheckName.css';
import { TextInput } from '../components/TextInput';
import { NumberInput } from '../components/NumberInput';
import { SelectInput } from '../components/SelectInput';
import { DateInput } from '../components/DateInput';

export function CheckName() {
  const [status, setStatus] = useState<'INITIAL' | 'SEND_DATA' | 'SENDING_DATA' | 'DATA_SENDED' | 'ERROR_SENDING_DATA'>('INITIAL');
  const [data, setData] = useState<BaseResponse>();
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [isMarried, setIsMarried] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    setIsFormValid(name.trim() !== '' && age > 0 && dateOfBirth !== null);
  }, [name, age, isMarried, dateOfBirth]);

  useEffect(() => {
    if (status === 'SEND_DATA' && isFormValid) {
      setStatus('SENDING_DATA');
      fetch('http://localhost:3001/info/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          age: age,
          married: isMarried,
          dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : null
        })
      })
        .then((rawResponse) => {
          if ([200, 201].includes(rawResponse.status)) {
            return rawResponse.json();
          } else {
            throw new Error();
          }
        })
        .then((response: BaseResponse) => {
          setStatus('DATA_SENDED');
          setData(response);
        })
        .catch(e => {
          setStatus('ERROR_SENDING_DATA');
        })
    }
  }, [status, name, age, isMarried, isFormValid, dateOfBirth]);

  if (status === 'ERROR_SENDING_DATA') {
    return (
      <div>
        <h1>ERRORE INVIO DATI</h1>
        <button onClick={() => setStatus('INITIAL')}>RIPROVA</button>
      </div>
    );
  }

  if (status === 'SEND_DATA' || status === 'SENDING_DATA') {
    return (
      <div>
        <h1>INVIO IN CORSO</h1>
        <button onClick={() => setStatus('INITIAL')}>ANNULLA</button>
      </div>
    );
  }

  if (status === 'DATA_SENDED') {
    return (
      <div>
        {data?.success === true && <h1>DATI INVIATI VALIDI</h1>}
        {data?.success === false && <h1>DATI INVIATI NON VALIDI</h1>}
        <button onClick={() => setStatus('INITIAL')}>INVIA UN ALTRO VALORE</button>
      </div>
    );
  }

  return (
    <div>
      <h1>INSERISCI I DATI</h1>
      <TextInput label="Nome" value={name} onChange={setName} />
      <DateInput label="Data di nascita" value={dateOfBirth} onChange={setDateOfBirth} />
      <NumberInput label="Età" value={age} onChange={setAge} />
      <SelectInput
        label="E' sposato/a?"
        value={isMarried}
        onChange={setIsMarried}
      />
      <hr />
      <button onClick={() => setStatus('SEND_DATA')} disabled={!isFormValid}>VALIDA</button>
    </div>
  );
}
