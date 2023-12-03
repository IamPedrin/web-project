import { Outlet } from "react-router-dom";


function App() {

  return (
    <>

      <section className="login-user">
        <header>
          <h1>Bem vindo ao site foda de series</h1>
        </header>
        <Outlet />
      </section>
      
    </>
  )
}

export default App