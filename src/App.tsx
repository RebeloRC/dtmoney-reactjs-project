import { useState } from "react";
import ReactModal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransaction";

ReactModal.setAppElement('#root')

export function App() {

 const [isNewtransactionModal, setIsNewtransactionModal] = useState(false);

 function handleOpenNewTransactionModal() {
  setIsNewtransactionModal(true)
 }

 function handleCloseNewTransactionModal() {
  setIsNewtransactionModal(false)
 }

  return (
    <TransactionsProvider>
     <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
     <Dashboard />
     <NewTransactionModal isOpen={isNewtransactionModal} onRequestClose={handleCloseNewTransactionModal}/>

     <GlobalStyle />
    </TransactionsProvider>
  );
}

