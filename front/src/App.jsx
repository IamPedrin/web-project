import { Outlet } from "react-router-dom";


function App() {

  return (
    <>

      <section className="centerBox">
        <header className="titulo">
          <h1>Boxletter</h1>
        </header>
        <Outlet />
      </section>
      
    </>
  )
}

export default App