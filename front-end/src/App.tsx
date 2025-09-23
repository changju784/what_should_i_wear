import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import DefaultBackground from "./assets/default_background.png";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router basename="/what_should_i_wear">
        <Header />
        <main
          className="min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${DefaultBackground})` }}
        >
          <AppRoutes />
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
