import { useState, useContext } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableCaption } from "@/components/ui/table";
import { HiOutlineClipboardList, HiPlus } from 'react-icons/hi';
import Modal from 'react-modal';
import FileUploader from '@/components/ui/file-uploader';
import { format } from 'date-fns';
import { AddToCartContex } from '@/contex/ContexCart';


const PAGE_SIZE = 10; // Define o número de itens por página

const HistoricoCobrancasPage = () => {
  const {historicData} = useContext(AddToCartContex);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula o índice inicial e final dos itens na página atual
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;

  // Filtra os itens para exibir apenas os da página atual
  const cobrancasPaginadas = historicData.slice(startIndex, endIndex);

  // Calcula o número total de páginas
  const totalPages = Math.ceil(historicData.length / PAGE_SIZE);

  // Função para avançar para a próxima página
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Função para voltar para a página anterior
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-14 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <HiOutlineClipboardList className="w-6 h-6 mr-2 text-blue-500 dark:text-blue-300" />
            <h1 className="text-2xl font-bold">Histórico Cobranças</h1>
          </div>
        </div>
        <Table className="w-full rounded-lg overflow-hidden">
          <TableHeader className="bg-blue-500 dark:bg-blue-600 text-white">
            <TableRow>
              <TableCell className="px-4 py-2 font-semibold">Nome Arquvio</TableCell>
              <TableCell className="px-4 py-2 font-semibold">Tamanho do Arquivo</TableCell>
              <TableCell className="px-4 py-2 font-semibold">Data de Upload</TableCell>
              <TableCell className="px-4 py-2 font-semibold">Usuário de Importação</TableCell>
              <TableCell className="px-4 py-2 font-semibold">Tempo de Upload</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-gray-100 dark:bg-gray-700">
            {historicData.map((cobranca, index) => (
              <TableRow key={index} className="hover:bg-gray-200 dark:hover:bg-gray-600">
                <TableCell className="px-4 py-2">{cobranca.nome_arquivo}</TableCell>
                <TableCell className="px-4 py-2">{cobranca.tamanho}</TableCell>
                <TableCell className="px-4 py-2">{format(new Date(cobranca.data_upload), 'dd/MM/yyyy')}</TableCell>
                <TableCell className="px-4 py-2">{cobranca.usuario}</TableCell>
                <TableCell className="px-4 py-2">{cobranca.tempo_upload}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption className="text-sm text-gray-500 dark:text-gray-400">Histório de cobranças</TableCaption>
        </Table>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoricoCobrancasPage;
