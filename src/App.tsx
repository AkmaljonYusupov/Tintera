import AppRouter from "./app/router/AppRouter";

import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  );
}

export default App;