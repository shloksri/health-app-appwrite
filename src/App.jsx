import MainApp from './components/MainApp'
import { UserProvider } from './context/UserContext'

function App() {


  return (
    <>
      <UserProvider>
        <MainApp />
      </UserProvider>
    </>
  )
}

export default App
