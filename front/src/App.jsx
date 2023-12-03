import { Outlet, Link } from "react-router-dom";


function App() {

  return (
    <>

      <section className="pag-inicial">
        <header>
          <h1>Bem vindo ao site de series do momento</h1>
        </header>
        <Outlet />
      </section>
      
    </>
  )
}

export default App
