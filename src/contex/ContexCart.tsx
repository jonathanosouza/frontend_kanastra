import api from "@/api/axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface IArquivo {
  id: number;
  name: string;
  governmentId: number;
  email: string;
  debtAmount: number;
  debtDueDate: Date;
  debtId: string;
}

interface IHistoric {
  id: number;
  nome_arquivo: string;
  tamanho: number;
  data_upload: Date;
  usuario: string;
  tempo_upload: number;
}

interface ArquivoProps {
  fileData: IArquivo[];
  historicData: IHistoric[];
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFileData : React.Dispatch<React.SetStateAction<IArquivo[]>>;
}

interface CobrancaPropsProviderProps {
  children: ReactNode;
  currentPage: number;
  pageSize: number;
}

export const AddToCartContex = createContext({} as ArquivoProps);
export const CartProvider = ({ children, currentPage, pageSize }: CobrancaPropsProviderProps) => {
  const [fileData, setFileData] = useState<IArquivo[]>([]);
  const [historicData, setHistoricData] = useState<IHistoric[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await api.get('/cobranca', {
          params: {
            page: currentPage,
            per_page: pageSize
          },
        });
        setFileData(response.data);
      } catch (error) {
        console.error('Erro ao buscar cobranças:', error);
      }
    };
    fetchData();
  }, [currentPage, pageSize]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await api.get('/historicocobranca');


        setHistoricData(response.data);
      } catch (error) {
        console.error('Erro ao buscar histórico de cobranças:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <AddToCartContex.Provider
      value={{
        fileData,
        modalIsOpen,
        setModalIsOpen,
        loading,
        setLoading,
        historicData,
        setFileData
      }}
    >
      {children}
    </AddToCartContex.Provider>
  );
};
