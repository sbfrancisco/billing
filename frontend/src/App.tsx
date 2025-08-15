import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import { Header } from "./components/Header"
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { DashboardPage } from "./pages/DashboardPage"
import { GeneratePage } from "./pages/GeneratePage"
import { AnalyticsPage } from "./pages/AnalyticsPage"
import { ProductRegisterPage } from "./pages/ProductRegisterPage"
import { SearchPage } from "./pages/SearchPage"
import { DataPage } from "./pages/DataPage"
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/generate" element={<GeneratePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/personal_data" element={<DataPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/register_service" element={<ProductRegisterPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
