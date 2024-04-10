import './App.css'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
// import Main from './components/Pages/MainPage'
// import Login from './components/Pages/LogInPage'
// import QuizPage from './components/Pages/QuizPage'
import AdminPage from './components/Pages/AdminPage'

function App() {
  console.log('----- App')
  return (
    <>
      <Header />
      {/* <Main /> */}
      {/* <Login /> */}
      {/* <QuizPage /> */}
      <AdminPage />
      <Footer />
    </>
  )
}

export default App
