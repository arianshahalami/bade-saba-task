import { Outlet } from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";

export const App = () => {
   return (
      <ThemeProvider dir="rtl">
         <Outlet />
      </ThemeProvider>
   );
};
