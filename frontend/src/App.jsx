import { WallpaperProvider } from "./context/WallpaperContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "@clerk/react";
import PageLoader from "./components/PageLoader";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";

function App() {
  // ✅ 1. Extraemos 'getToken' que nos da el SDK de Clerk
  const { isSignedIn, isLoaded, getToken } = useAuth();

  const { checkAuth, isCheckingAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      // ✅ 2. Creamos una mini-función asíncrona interna para poder usar 'await'
      const autenticarBackend = async () => {
        try {
          const tokenClerk = await getToken(); // 🔑 Esperamos a que Clerk genere el JWT string
          if (tokenClerk) {
            await checkAuth(tokenClerk); // 🚀 Se lo pasamos a tu store de Zustand
          }
        } catch (error) {
          console.error("Error al obtener el token desde Clerk:", error);
        }
      };

      autenticarBackend();
    } else {
      clearAuth();
    }
  }, [checkAuth, clearAuth, isLoaded, isSignedIn, getToken]); // Añadido 'getToken' a las dependencias

  if (!isLoaded || (isSignedIn && isCheckingAuth)) return <PageLoader />;

  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path="/" element={isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace />} />
          <Route
            path="/auth"
            element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />}
          />
        </Routes>
        <Toaster />
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;