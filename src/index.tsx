import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { App } from "components/app";

import "style/style.scss";

const client = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
	// <React.StrictMode>
	<QueryClientProvider client={client}>
		<App />;
	</QueryClientProvider>
	// </React.StrictMode>
);
