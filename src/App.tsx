import { BrowserRouter, Routes, Route } from "react-router-dom"
import RootLayout from "./Layouts/RootLayout"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App