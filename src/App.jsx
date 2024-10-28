import MainApp from './components/MainApp'
import MainApp2 from './components/MainApp2'
import { UserProvider } from './context/UserContext'
import Temp from './Temp'
function App() {


  return (
    <>
      {/* <MainApp /> */}
      {/* <Temp /> */}

      <UserProvider>
        <MainApp />
      </UserProvider>
    </>
  )
}

export default App
