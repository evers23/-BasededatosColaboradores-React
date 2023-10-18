// Importación de módulos y componentes necesarios
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Buscador = ({ buscarColaboradores }) => {
  const [filtro, setFiltro] = useState('');

  const handleInputChange = (event) => {
    setFiltro(event.target.value);
  };

  const handleSearch = () => {
    buscarColaboradores(filtro);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar colaboradores"
        value={filtro}
        onChange={handleInputChange}
      />
      <div className="input-group-append">
        <button className="btn btn-primary" type="button" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default Buscador;