import { useLocation } from "react-router-dom";

function Details() {
  const location = useLocation();
  const content = location.state.content;

  return (
    <div>
      <h1>Opis</h1>
      <p>{content}</p>
    </div>
  );
}

export default Details;
