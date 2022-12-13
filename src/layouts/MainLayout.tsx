import { Container, Box } from "@mui/material";
import { MainHeader } from "../components/Headers/MainHeader";
export const MainLayout = ({ children }) => {
  return (
    <>
      {/* <Siderbar /> */}
      <div
        style={{
          background: "linear-gradient(138.11deg, #FEF452 0%, #942F70 121.92%)",
        }}
      >
        {/* <Header /> */}
        <MainHeader />
        <Container>
          <main>{children}</main>
        </Container>
        <Box
          sx={{
            width: "100%",
            padding: "200px",
          }}
        ></Box>
        {/* <Footer /> */}
      </div>
    </>
  );
};
