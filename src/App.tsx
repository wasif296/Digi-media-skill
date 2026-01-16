import "@mantine/core/styles.css"; 
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme"; 
import AppRoutes from "./routes/AppRoutes"; 

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AppRoutes />
    </MantineProvider>
  );
}