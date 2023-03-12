import { useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, Alert } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import LiveStream from "scenes/LiveStream";
import LiveView from "scenes/LiveView";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const [alert, setAlert] = useState();

  const showAlert = (message, sev)=>{
    setAlert({
      msg : message,
      severity : sev
      })
    setTimeout(()=>{
      setAlert(null)
    },5000);
  }

  return (
    <div className="app">
      <BrowserRouter>
      {alert && <Alert severity={alert.severity}>{alert.msg}</Alert>}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage setAlert={showAlert} />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/live"
              element={<LiveStream />}
            />
            <Route
              path="/watchlive"
              element={<LiveView />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
