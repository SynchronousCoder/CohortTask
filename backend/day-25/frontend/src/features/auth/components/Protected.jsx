import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    navigate("/login");
  }
    return children;
};

export default Protected;