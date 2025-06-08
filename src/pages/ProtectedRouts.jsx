import { Navigate } from "react-router-dom";

function ProtectedRouts({ children, user }) {
  if (user) {
    return children;
  } else {
    return <Navigate to="login" />;
  }
}

export default ProtectedRouts;
