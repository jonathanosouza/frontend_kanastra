import React, { useContext } from 'react';
import { AddToCartContex } from '@/contex/ContexCart';

const LoaderUpload = () => {
  const { loading } = useContext(AddToCartContex);

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center ${loading ? 'visible' : 'hidden'}`}>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default LoaderUpload;
