import React, { createContext, useContext, useEffect, useState } from 'react';
import api from './api'; // Importe sua instância de API aqui

interface IArquivo {
  id: number;
  name: string;
  governmentId: number;
  email: string;
  debtAmount: number;
  debtDueDate: Date;
  debtId: string;
}

interface ContextType {
  fileData: IArquivo[];
  fetchFileData: () => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const useFileDataContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useFileDataContext deve ser usado dentro de um Provider');
  }
  return context;
};

export const FileDataProvider: React.FC = ({ children }) => {
  const [fileData, setFileData] = useState<IArquivo[]>([]);

  const fetchFileData = async () => {
    try {
      const response = await api.get('/cobranca');
      setFileData(response.data);
    } catch (error) {
      console.error('Erro ao buscar cobranças:', error);
    }
  };

  useEffect(() => {
    fetchFileData();
  }, []);

  return (
    <Context.Provider value={{ fileData, fetchFileData }}>
      {children}
    </Context.Provider>
  );
};
