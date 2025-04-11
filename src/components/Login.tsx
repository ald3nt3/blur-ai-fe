import { Box, Button, Typography } from "@mui/joy";
import Card from "@mui/joy/Card";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthStatus } from "../hooks/useAuthStatus";
import ImageUpload from "./ImageUpload";

const Login = () => {
  const { handleLogin, handleLogout } = useAuthentication();
  const { isAuth } = useAuthStatus();

  return (
    <Card
      color="primary"
      invertedColors={false}
      orientation="vertical"
      size="lg"
      variant={"soft"}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <Typography alignSelf="center" level="h2" variant="plain">
          PKCE AUTH
        </Typography>
        <Typography alignSelf="center" level="h4" variant="plain">
          Authentication status: {JSON.stringify(isAuth)}
        </Typography>
        <Box alignSelf="center" sx={{ display: "flex", gap: 4 }}>
          <Button
            variant="solid"
            size="lg"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            onClick={() => handleLogin()}
          >
            Login
          </Button>
          <Button
            variant="solid"
            size="lg"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
          {isAuth && <ImageUpload/>}
        </Box>
      </Box>
    </Card>
  );
};

export default Login;
