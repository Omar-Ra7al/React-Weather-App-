import "./App.css";
import Card from "./CardWeather";

// How to add the font by using the provider ??
// 1- import >> createTheme, ThemeProvider
import { createTheme, ThemeProvider } from "@mui/material/styles";
// 2- made a variable iusing the create theme into it
const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Card />
      </ThemeProvider>
    </div>
  );
}

export default App;
