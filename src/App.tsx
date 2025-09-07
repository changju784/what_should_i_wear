import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router basename="/what_should_i_wear">
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;