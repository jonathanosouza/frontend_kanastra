import api from '@/api/axios';
import { AddToCartContex } from '@/contex/ContexCart';
import React, { useContext, useEffect, useReducer } from 'react';

type FileUploaderProps = {
  file: File | null;
  onFileChange: (file: File) => void;
  onUpload?: () => void;
};


const fileReducer = (state, action) => {
  switch (action.type) {
    case 'UPLOAD_FILE':
      return {
        ...state,
        loading: true,
      };
    case 'UPLOAD_FILE_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'UPLOAD_FILE_ERROR':
      return {
        ...state,
        loading: false,
      };
    case 'UPDATE_FILE_DATA':
      return {
        ...state,
        fileData: action.payload,
      };
    default:
      return state;
  }
};

const FileUploader: React.FC<FileUploaderProps> = ({ file, onFileChange, onUpload }) => {
  const { setModalIsOpen, setLoading,  fileData: currentFileData } = useContext(AddToCartContex);
  const [state, dispatch] = useReducer(fileReducer, {
    loading: false,
    fileData: currentFileData,
  });


  useEffect(() => {
    //effect

  }, [state.fileData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      onFileChange(selectedFile);
    } else {
      console.error('Nenhum arquivo selecionado');
    }
  };

  const handleUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setModalIsOpen(false);
    setLoading(true);

    dispatch({ type: 'UPLOAD_FILE' });

    try {
      if (!file) {
        console.error('Nenhum arquivo selecionado');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name);
      formData.append('size', file.size.toString());

      const response = await api.post('/uploadcobranca', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
      dispatch({ type: 'UPLOAD_FILE_SUCCESS' });
      if (onUpload) {
        onUpload();
      }

      const updatedResponse = await api.get('/cobranca');
      dispatch({ type: 'UPDATE_FILE_DATA', payload: updatedResponse.data });

      setLoading(false);


      alert('Arquivo processado com sucesso!');
      window.location.reload()

    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
      dispatch({ type: 'UPLOAD_FILE_ERROR' });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          <p className="pb-6">Detalhes do Arquivo:</p>
          <ul>
            <li>Nome: {file.name}</li>
            <li>Tipo: {file.type}</li>
            <li>Tamanho: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && <button className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold" onClick={handleUpload}>Upload do Arquivo</button>}
    </div>
  );
};

export default FileUploader;
