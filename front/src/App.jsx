import { Outlet } from "react-router-dom";


function App() {

  return (
    <>

      <section className="login-user">
        <header className="titulo">
          <h1>Boxletter</h1>
        </header>
        <Outlet />
      </section>
      
    </>
  )
}

export default App