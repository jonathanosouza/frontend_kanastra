import { Route, Routes } from "react-router-dom";

import { Layout } from "./components";
import ListarCobrancasPage from "./pages/ListarCobrancasPage";
import HistoricoCobrancasPage from "./pages/HistoricoCobrancasPage";




export function Router() {

return (

<Routes>
  <Route path="/" element={<Layout />}>
  <Route path="/cadastrarcobranca" element={<ListarCobrancasPage/>} />
  <Route path="/historicocobranca" element={<HistoricoCobrancasPage/>} />

  </Route>
</Routes>

)
}
