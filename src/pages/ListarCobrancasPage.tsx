import { useState, useContext } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableCaption } from "@/components/ui/table";
import { HiOutlineClipboardList, HiPlus } from 'react-icons/hi';
import Modal from 'react-modal';
import FileUploader from '@/components/ui/file-uploader';
import { format } from 'date-fns';
import { AddToCartContex } from '@/contex/ContexCart';
import LoaderUpload from '@/components/loader';


const PAGE_SIZE = 10;

const ListarCobrancasPage = () => {
  const {fileData, modalIsOpen, loading, setModalIsOpen} = useContext(AddToCartContex);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula o índice inicial e final dos itens na página atual
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE;

  // Filtra os itens para exibir apenas os da página atual
  const cobrancasPaginadas = fileData.slice(startIndex, endIndex);

  // Calcula o número total de páginas
  const totalPages = Math.ceil(fileData.length / PAGE_SIZE);

  const firstPage = () => {
    setCurrentPage(1);
  };

  // Função para avançar para a próxima página
  const lastPage = () => {
  setCurrentPage(totalPages);
};

// Função para avançar para a próxima página
const nextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

// Função para voltar para a página anterior
const prevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};
return (
  <div className="p-4 sm:ml-64">
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-14 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <HiOutlineClipboardList className="w-6 h-6 mr-2 text-blue-500 dark:text-blue-300" />
          <h1 className="text-2xl font-bold">Cadastrar Cobranças</h1>
        </div>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => setModalIsOpen(true)}
        >
          <HiPlus className="w-5 h-5 mr-1" />
          Inserir Cobrança
        </button>
      </div>
      <Table className="w-full rounded-lg overflow-hidden">
        <TableHeader className="bg-blue-500 dark:bg-blue-600 text-white">
          <TableRow>
            <TableCell className="px-4 py-2 font-semibold">Nome</TableCell>
            <TableCell className="px-4 py-2 font-semibold">Número do documento</TableCell>
            <TableCell className="px-4 py-2 font-semibold">Email do sacado</TableCell>
            <TableCell className="px-4 py-2 font-semibold">R$ Valor</TableCell>
            <TableCell className="px-4 py-2 font-semibold">Data à pagar</TableCell>
            <TableCell className="px-4 py-2 font-semibold">Código para débito</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-gray-100 dark:bg-gray-700">
          {cobrancasPaginadas.map((cobranca, index) => (
            <TableRow key={index} className="hover:bg-gray-200 dark:hover:bg-gray-600">
              <TableCell className="px-4 py-2">{cobranca.name}</TableCell>
              <TableCell className="px-4 py-2">{cobranca.governmentId}</TableCell>
              <TableCell className="px-4 py-2">{cobranca.email}</TableCell>
              <TableCell className="px-4 py-2">{cobranca.debtAmount}</TableCell>
              <TableCell className="px-4 py-2">{format(new Date(cobranca.debtDueDate), 'dd/MM/yyyy')}</TableCell>
              <TableCell className="px-4 py-2">{cobranca.debtId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className="text-sm text-gray-500 dark:text-gray-400">Lista de cobranças</TableCaption>
      </Table>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={firstPage}
          disabled={currentPage === 1}
        >
          Primeira
        </button>
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <div className="flex items-center">
          <span className="mr-2 text-gray-600 dark:text-gray-400">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
          <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={lastPage}
          disabled={currentPage === totalPages}
        >
          Última
        </button>
        </div>
      </div>
    </div>

    {loading && <LoaderUpload/>}
    <Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  className="fixed inset-0 flex items-center justify-center z-50"
  overlayClassName="fixed inset-0 bg-gray opacity-100"
  contentLabel="Inserir Cobrança"
>
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-1/2 max-w-lg">
    <button
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      onClick={() => setModalIsOpen(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <h2 className="text-xl font-semibold mb-4">Insira um arquivo CSV</h2>
    <form action="">
      <div>
        <FileUploader file={selectedFile} onFileChange={setSelectedFile} onUpload={() => setModalIsOpen(false)} />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setModalIsOpen(false)}
      >
        Fechar Modal
      </button>
    </form>
  </div>
</Modal>
  </div>
);
}

export default ListarCobrancasPage;
