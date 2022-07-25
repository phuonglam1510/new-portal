import React, { FC, createContext, useContext, useState } from "react";
import { ConfirmationModal } from "../../../components/ConfirmationModal";

interface ConfirmationProps {
  title: string;
  message: string;
  onOk: () => any;
}

class ContextProps {
  title: string = "";
  message: string = "";
  onOk!: () => any;
  close!: () => void;
  confirm!: (props: ConfirmationProps) => any;
}

const GlobalContext = createContext<ContextProps>(new ContextProps());

let onOk: any = () => true;

const GlobalProvider: FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const confirm = (props: ConfirmationProps) => {
    setTitle(props.title);
    setMessage(props.message);
    onOk = () => {
      close();
      props.onOk();
    };
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setTitle("");
    setMessage("");
  };

  return (
    <GlobalContext.Provider value={{ confirm, close, onOk, title, message }}>
      {children}
      {visible && <ConfirmationModal onOk={onOk} />}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);
export { GlobalProvider, useGlobalContext };
