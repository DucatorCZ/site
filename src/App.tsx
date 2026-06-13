import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import PeriodListPage from './pages/PeriodListPage'
import PeriodPage from './pages/PeriodPage'
import CoinTypePage from './pages/CoinTypePage'
import CoinFactPage from './pages/CoinFactPage'
import PopulationPage from './pages/PopulationPage'
import SearchPage from './pages/SearchPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/obdobi" element={<PeriodListPage />} />
          <Route path="/obdobi/:periodSlug" element={<PeriodPage />} />
          <Route path="/obdobi/:periodSlug/:coinSlug" element={<CoinTypePage />} />
          <Route path="/obdobi/:periodSlug/:coinSlug/:year" element={<CoinFactPage />} />
          <Route path="/populace" element={<PopulationPage />} />
          <Route path="/hledat" element={<SearchPage />} />
          <Route path="/o-projektu" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
