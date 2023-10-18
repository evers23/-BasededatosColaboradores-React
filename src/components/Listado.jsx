/* eslint-disable react/prop-types */
   
// eslint-disable-next-line react/prop-types
const Listado = ({ colaboradores, onEliminarColaborador }) => (
  <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Edad</th>
          <th>Cargo</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
  
        {colaboradores.map(({ id, nombre, correo, edad, cargo, telefono })  => (

          <tr key={id}>
            <td>{id}</td>
            <td>{nombre}</td>
            <td>{correo}</td>
            <td>{edad}</td>
            <td>{cargo}</td>
            <td>{telefono}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onEliminarColaborador(id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Listado;
  