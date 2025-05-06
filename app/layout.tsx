import { RoomImageProvider } from "./RoomImageContext";
import Menu from "./component/Menu";
import "./styles/globals.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <html lang="en">
        <body>
          <RoomImageProvider>
            <Menu />
            <main>{children}</main>
          </RoomImageProvider>
        </body>
      </html>
    </>
  );
};

export default Layout;
