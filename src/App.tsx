import "./App.css";
import "primereact/resources/themes/saga-blue/theme.css";
import Home from "./views/Home";
import { PrimeReactProvider } from "primereact/api";
import { GoogleOAuthProvider } from "@react-oauth/google";

<head>
  <script
    dangerouslySetInnerHTML={{
      __html: `
              const style = document.createElement('style')
              style.innerHTML = '@layer tailwind-base, primereact, tailwind-utilities;'
              style.setAttribute('type', 'text/css')
              document.querySelector('head').prepend(style)
            `,
    }}
  />
</head>;

function App() {
  return (
    <PrimeReactProvider>
      <Home />
    </PrimeReactProvider>
  );
}

export default App;
