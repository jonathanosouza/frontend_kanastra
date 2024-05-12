// import { useContext, useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { CartProvider } from "./contex/ContexCart"

function App() {
  return (

    <BrowserRouter>
    <CartProvider>
      <Router/>
      </CartProvider>
    </BrowserRouter>


  )
}

export default App
