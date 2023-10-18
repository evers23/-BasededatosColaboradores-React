// Importación de módulos y componentes 
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import Buscador from "./components/Buscador";
import { BaseColaboradores } from "./BaseColaboradores";
import Alert from "./components/Alert";

const App = () => {
  const [colaboradores, setColaboradores] = useState(BaseColaboradores);
  const [mensaje, setMensaje] = useState(null);
  const [nextId, setNextId] = useState(() => {
  const maxId = Math.max(...colaboradores.map((colaborador) => colaborador.id), 0);
  return maxId + 1;
});

  const agregarColaborador = (nuevoColaborador) => {
    const colaboradorNuevo = { ...nuevoColaborador, id: nextId };
    setColaboradores([...colaboradores, colaboradorNuevo]);
    setNextId(nextId + 1);
    mostrarMensaje("Colaborador agregado correctamente", "success");
  };

  const eliminarColaborador = (id) => {
    const nuevosColaboradores = colaboradores.filter((colaborador) => colaborador.id !== id);
    setColaboradores(nuevosColaboradores);
    mostrarMensaje("Colaborador eliminado correctamente", "success");
  };
  
  const buscarColaboradores = (filtro) => {
    const busqueda = filtro.toLowerCase();
    const colaboradoresFiltrados = filtro === "" ? BaseColaboradores
      : colaboradores.filter((colaborador) => (
          colaborador.nombre.toLowerCase().includes(busqueda) ||
          colaborador.correo.toLowerCase().includes(busqueda) ||
          colaborador.edad.toString().includes(busqueda) ||
          colaborador.cargo.toLowerCase().includes(busqueda) ||
          colaborador.telefono.includes(busqueda)
        ));
  
    setColaboradores(colaboradoresFiltrados);
  };

  const mostrarMensaje = (mensaje, tipo) => {
    setMensaje({ mensaje, tipo }); 
 
    // Establecer un temporizador para ocultar el mensaje después de 3 segundos
    const mensajeTimer = setTimeout(() => {
      setMensaje(null);
    }, 3000);
  
    // Limpia el temporizador cuando el componente se desmonta o cuando se llama a mostrarMensaje nuevamente
    return () => clearTimeout(mensajeTimer);
  };
  
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h1>Lista de Colaboradores</h1>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col md={8}>
            <Buscador buscarColaboradores={buscarColaboradores} />
            {mensaje && <Alert mensaje={mensaje.texto} tipo={mensaje.tipo} />}
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col md={8}>
            <Listado colaboradores={colaboradores} onEliminarColaborador={eliminarColaborador} />
          </Col>
          <Col md={4}>
            <Formulario onAgregarColaborador={agregarColaborador} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;