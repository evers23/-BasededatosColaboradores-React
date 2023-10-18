
// eslint-disable-next-line react/prop-types
const Alert = ({mensaje, color }) => {
  return (
    <div className={`alert alert-${color}`} role="alert">
      {mensaje}
    </div>
  );
};

export default Alert;
