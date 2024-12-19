import { useState, useEffect } from 'react';
import styles from './inputDate.module.scss'; // Importando o SASS

interface InputDateProps {
  onDateChange: (date: string) => void; // Callback para retornar o valor atualizado
  initialValue?: string; // Valor inicial  no formato MM/YYYY
}

export default function InputDate({ initialValue, onDateChange }: InputDateProps) {
  const [monthYear, setMonthYear] = useState(getCurrentMonthYear());

  // Obtém o mês e ano atuais no formato MM/YYYY
  function getCurrentMonthYear() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${month}/${year}`;
  }

  // Função para ajustar o mês e ano
  function adjustMonthYear(direction: number) {
    let [month, year] = monthYear.split('/').map(Number);

    // Ajusta o mês com base na direção (incremento ou decremento)
    month += direction;

    if (month > 12) {
      month = 1;
      year += 1; // Incrementa o ano
    }
    if (month < 1) {
      month = 12;
      year -= 1; // Decrementa o ano
    }

    const formattedMonth = String(month).padStart(2, '0');
    const newMonthYear = `${formattedMonth}/${year}`;

    // Atualiza o estado e notifica o componente pai
    setMonthYear(newMonthYear);
    onDateChange(newMonthYear);
  }

  // Efeito para inicializar o estado com o valor recebido via prop
  useEffect(() => {
    if (initialValue) {
      setMonthYear(initialValue);
    }
  }, [initialValue]);

  return (
    <div className={styles.inputDateContainer}>
      {/* Input de mês/ano */}
      <input
        type="text"
        value={monthYear}
        readOnly
        className={styles.input}
      />

      {/* Botões para ajustar o mês/ano */}
      <div className={styles.buttonsContainer}>
        <button
          type="button"
          className={styles.button}
          onClick={() => adjustMonthYear(1)} // Incrementa o mês
        >
          +
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => adjustMonthYear(-1)} // Decrementa o mês
        >
          -
        </button>
      </div>
    </div>
  );
}
