// Importación de módulos y componentes necesarios
import { useState } from "react";
import { BaseColaboradores } from "../BaseColaboradores";
import Alert from "./Alert";

// eslint-disable-next-line react/prop-types
const Formulario = ({ onAgregarColaborador }) => {
  // Estado para almacenar los datods del nuevo colaborador
  const [colaborador, setColaborador] = useState({
    nombre: "",
    correo: "",
    edad: "",
    cargo: "",
    telefono: "",
  });

  // Mostrar mensajes de alerta
  const [alerta, setAlerta] = useState(null);

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    setColaborador({
      ...colaborador,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación de los campos del formulario
    const { nombre, correo, edad, cargo, telefono } = colaborador;
    if (!nombre.trim() || !correo.trim() || !edad.trim() || !cargo.trim() || !telefono.trim()) {
      // Mostrar mensajes de alerta si esta vacio
      setAlerta({
        mensaje: "Todos los campos son obligatorios.",
        color: "danger",
      });

      // Ocultar alerta
      setTimeout(() => {
        setAlerta(null);
      }, 3000);
    } else if (!validarCorreo(colaborador.correo)) {
      // Mostrar alerta si el correo no es válido
      setAlerta({
        mensaje: "Ingrese un correo electronico valido.",
        color: "danger",
      });
      // Ocultar alerta
      setTimeout(() => {
        setAlerta(null);
      }, 3000);
    } else {
      // Generar un ID único para el nuevo colaborador
      const nuevoId = generarIdUnico();

      // Agregar el nuevo colaborador con el ID único
      const nuevoColaborador = {
        ...colaborador,
        id: nuevoId,
      };

      // Agregar el nuevo colaborador
      onAgregarColaborador(nuevoColaborador);

      // Restablecer los campos del formulario
      setColaborador({
        nombre: "",
        correo: "",
        edad: "",
        cargo: "",
        telefono: "",
      });
      // Mostrar alerta 
      setAlerta({
        mensaje: "Colaborador agregado correctamente",
        color: "success",
      });

      // Restablecer el formulario
      setColaborador({
        nombre: "",
        correo: "",
        edad: "",
        cargo: "",
        telefono: "",
      });

      // Ocultar alerta
      setTimeout(() => {
        setAlerta(null);
      }, 3000);
    }
  };

  // Función para validar el formato de correo 
  const validarCorreo = (correo) => {
    // Verificar el formato de correo
    const regexCorreo = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regexCorreo.test(correo);
  };

  // Función para generar un ID único para el nuevo colaborador
  const generarIdUnico = () => {
    const ultimoId = BaseColaboradores[BaseColaboradores.length - 1].id;

    // Generar un nuevo ID
    const nuevoId = parseInt(ultimoId) + 1;
    return nuevoId.toString();
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Agregar colaborador</h2>
      <form
        onSubmit={handleSubmit}
        style={{ width: "300px", display: "flex", flexDirection: "column" }}
      >
        <div>
          <label htmlFor="nombre" className="form-label"></label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={colaborador.nombre}
            onChange={handleChange}
            name="nombre"
            placeholder="Nombre"
          />
        </div>
        <div>
          <label htmlFor="correo" className="form-label"></label>
          <input
            type="mail"
            id="correo"
            className="form-control"
            value={colaborador.correo}
            onChange={handleChange}
            name="correo"
            placeholder="Correo"
          />
        </div>
        <div>
          <label htmlFor="edad" className="form-label"></label>
          <input
            type="number"
            id="edad"
            className="form-control"
            value={colaborador.edad}
            onChange={handleChange}
            name="edad"
            placeholder="Edad"
          />
        </div>
        <div>
          <label htmlFor="cargo" className="form-label"></label>
          <input
            type="text"
            id="cargo"
            className="form-control"
            value={colaborador.cargo}
            onChange={handleChange}
            name="cargo"
            placeholder="Cargo"
          />
        </div>
        <div>
          <label htmlFor="telefono" className="form-label"></label>
          <input
            type="text"
            id="telefono"
            className="form-control"
            value={colaborador.telefono}
            onChange={handleChange}
            name="telefono"
            placeholder="Teléfono"
          />
        </div>
        <button
          className="btn btn-primary btn-md"
          type="submit"
          onClick={handleSubmit}
          disabled={alerta && alerta.color !== "success"}
          style={{
            display: "flex",
            margin: "20px 0px",
            width: "300px",
            justifyContent: "center",
          }}
        >
          Agregar Colaborador
        </button>
        {alerta ? ( <Alert mensaje={alerta.mensaje} color={alerta.color} />   ) : null}
      </form>
    </div>
  );
};

export default Formulario;