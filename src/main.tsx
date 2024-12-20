import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const apiUrl = import.meta.env.VITE_GRAPHQL_API;

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
