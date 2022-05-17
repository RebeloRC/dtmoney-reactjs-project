import { FormEvent, useState } from "react";
import ReactModal from "react-modal";
import { useTransactions } from "../../hooks/useTransaction";


import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"


import { Container, RadioBox, TransactiontypeContainer } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewtransaction(event: FormEvent){
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    })
    
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('');

    onRequestClose();
  }

  return(
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName="react-modal-overlay" className="react-modal-content">

      <button type="button" onClick={onRequestClose} className="react-modal-close"><img src={closeImg} alt="Fechar Modal"/></button>

      <Container onSubmit={handleCreateNewtransaction}>
       <h2>Teste</h2>

       <input type="text" placeholder="Tipo" value={title} onChange={event => setTitle(event.target.value)} />
       <input type="number" placeholder="Valor" value={amount} onChange={event => setAmount(Number(event.target.value))}/>

       <TransactiontypeContainer>

        <RadioBox type="button" onClick={() => setType('deposit')} isActive={type === 'deposit'} activeColor="green">
          <img src={incomeImg} alt="Entrada" />
          <span>Entrada</span>
        </RadioBox>

        <RadioBox type="button" onClick={() => setType('withdraw')} isActive={type === 'withdraw'} activeColor="red">
          <img src={outcomeImg} alt="saída"/>
          <span>Saída</span> 
        </RadioBox>

       </TransactiontypeContainer>

       <input type="text" placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)}/>

       <button type="submit">Cadastrar</button>
      </Container>
    </ReactModal>
  );
}