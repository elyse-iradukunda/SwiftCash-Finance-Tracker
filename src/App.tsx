import { BrowserRouter, Routes, Route } from "react-router-dom"
import RootLayout from "./Layouts/RootLayout"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import AddTransactions from "./pages/AddTransaction"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions">
            <Route index element={<Transactions />} />
            <Route path="add" element={<AddTransactions />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App