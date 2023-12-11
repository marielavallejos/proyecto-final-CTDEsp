import * as React from "react";
import { FC, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import NextLink from "next/link";
import {
  Drawer,
  List,
  ListItem,
  Link as MUILink,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useAuth } from "context/AuthContext";
import Cookies from "js-cookie";
import router from "next/router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {
  variant?: "simple" | "general";
};

const Header: FC<Props> = ({ variant }: Props) => {
  const { user } = useAuth();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Container maxWidth="xl" sx={{ height: "100px", maxWidth: "100%" }}>
      <Toolbar
        disableGutters
        sx={{
          paddingX: "40px",
          background: "#F7F7FF",
          marginTop: "17px",
          height: "10px",
        }}
      >
        {/* Pantalla peuqueña */}
        {isSmallScreen ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", marginRight: 3 }}
              >
                <NextLink href="/" passHref>
                  <Image
                    src="/logo.png"
                    width={75}
                    height={40}
                    alt="Logo"
                  />
                </NextLink>
              </Box>

              {user && (
                <>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <NextLink href="/actualizacion-perfil">
                    <Image
                      src="/perfil.png"
                      width={30}
                      height={30}
                      alt="Perfil"
                    />
                    </NextLink>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "black",
                        fontSize: 14,
                        fontWeight: 400,
                        marginRight: 4,
                      }}
                      onClick={handleDrawerOpen}
                    >
                      {user.name} {user.lastname}
                    </Typography>
                  </Box>
                </>
              )}

              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="end"
                sx={{ display: { sm: "block", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={handleDrawerClose}
              sx={{
                width: 206, 
              }}
            >
              <List>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 7,
                    marginTop: 1,
                    marginBottom: 2,
                  }}
                >
                  <NextLink href="/" passHref>
                    <Image
                      src="/logo.png"
                      width={75}
                      height={40}
                      alt="Logo"
                    />
                  </NextLink>
                </Box>
                <Divider />
                {!user && (
                  <>
                    {/* Lista para usuarios no logueados */}
                    <ListItem button>
                      <NextLink href="/registro" passHref>
                        <MUILink
                          variant="body2"
                          sx={{
                            color: "black",
                            fontSize: 14,
                            fontWeight: 400,
                            marginRight: 5,
                          }}
                        >
                          Registrarse
                        </MUILink>
                      </NextLink>
                    </ListItem>
                    <ListItem button>
                      <NextLink href="/login" passHref>
                        <MUILink
                          variant="body2"
                          sx={{ color: "black", fontSize: 14, fontWeight: 400 }}
                        >
                          Iniciar Sesión
                        </MUILink>
                      </NextLink>
                    </ListItem>
                    <ListItem button>
                      <NextLink href="/proyectos-generales" passHref>
                        <MUILink
                          variant="body2"
                          sx={{ color: "black", fontSize: 14, fontWeight: 400 }}
                          onClick={handleDrawerClose}
                        >
                          Explorar proyectos
                        </MUILink>
                      </NextLink>
                    </ListItem>
                  </>
                )}
                {user && user.id !== 55 && (
                  <>
                    {/* Lista para usuarios logueados distintos de ADMIN*/}
                    <ListItem button>
                      <NextLink href="/proyectos-generales" passHref>
                        <MUILink
                          variant="body2"
                          sx={{ color: "black", fontSize: 14, fontWeight: 400 }}
                          onClick={handleDrawerClose}
                        >
                          Explorar proyectos
                        </MUILink>
                      </NextLink>
                    </ListItem>
                    <ListItem button>
                      <NextLink href="/nuevo-proyecto" passHref>
                        <MUILink
                          variant="body2"
                          sx={{
                            color: "black",
                            fontSize: 14,
                            fontWeight: 400,
                            background: "#CDCACC",
                            padding: "5px",
                            borderRadius: "20px",
                          }}
                          onClick={handleDrawerClose}
                        >
                          Crear un proyecto
                        </MUILink>
                      </NextLink>
                    </ListItem>
                    <ListItem button>
                      <NextLink href="/mis-donaciones-proyectos" passHref>
                        <MUILink
                          variant="body2"
                          sx={{ color: "black", fontSize: 14, fontWeight: 400 }}
                          onClick={handleDrawerClose}
                        >
                          Mis donaciones y proyectos
                        </MUILink>
                      </NextLink>
                    </ListItem>
                    <ListItem button>
                      <NextLink href="/" passHref>
                        <MUILink
                          variant="body2"
                          sx={{
                            color: "black",
                            fontSize: 14,
                            fontWeight: 400,
                          }}
                          onClick={() => {
                            Cookies.remove("access-confirmacion");
                            // Cookies.remove("_vercel_jwt")
                            router.reload();
                          }}
                        >
                          Cerrar Sesión
                        </MUILink>
                      </NextLink>
                    </ListItem>
                  </>
                )}
                {user && user.id === 55 && (
                  <>
                    {/* Lista para usuarios ADMIN */}
                    <ListItem button>
                      <NextLink href="/proyectos-generales" passHref>
                        <MUILink
                          variant="body2"
                          sx={{ color: "black", fontSize: 14, fontWeight: 400 }}
                          onClick={handleDrawerClose}
                        >
                          Explorar proyectos
                        </MUILink>
                      </NextLink>
                    </ListItem>
                    <ListItem button>
                      <NextLink href="/reportes" passHref>
                        <MUILink
                          variant="body2"
                          sx={{
                            color: "black",
                            fontSize: 14,
                            fontWeight: 800,
                          }}
                          onClick={handleDrawerClose}
                        >
                          Reportes
                        </MUILink>
                      </NextLink>
                    </ListItem>
                    <ListItem button>
                      <NextLink href="/" passHref>
                        <MUILink
                          variant="body2"
                          sx={{
                            color: "black",
                            fontSize: 14,
                            fontWeight: 400,
                          }}
                          onClick={() => {
                            Cookies.remove("access-confirmacion");
                            router.reload();
                          }}
                        >
                          Cerrar Sesión
                        </MUILink>
                      </NextLink>
                    </ListItem>
                  </>
                )}
              </List>
            </Drawer>
          </>
        ) : (
          <>
            <NextLink href="/proyectos-generales" passHref>
              <MUILink
                variant="body2"
                sx={{
                  color: "black",
                  fontSize: 14,
                  fontWeight: 400,
                  marginRight: 5,
                }}
              >
                Explorar proyectos
              </MUILink>
            </NextLink>
            {user && user.id === 55 ? (
              <></>
            ) : (
              <NextLink href="/nuevo-proyecto" passHref>
                <MUILink
                  variant="body2"
                  sx={{
                    color: "black",
                    fontSize: 14,
                    fontWeight: 400,
                    marginRight: 5,
                    background: "#CDCACC",
                    padding: "8px",
                    borderRadius: "20px",
                  }}
                >
                  Crear un proyecto
                </MUILink>
              </NextLink>
            )}
            <Box sx={{ marginLeft: "auto", marginTop: "5px" }}>
              <NextLink href="/" passHref>
                <Image
                  src="/logo_completo.png"
                  width={284}
                  height={50}
                  alt="Logo"
                />
              </NextLink>
            </Box>
            {!user && (
              <Box sx={{ marginLeft: "auto" }}>
                <NextLink href="/registro" passHref>
                  <MUILink
                    variant="body2"
                    sx={{
                      color: "black",
                      fontSize: 14,
                      fontWeight: 400,
                      marginRight: 5,
                    }}
                  >
                    Registrarse
                  </MUILink>
                </NextLink>
                <NextLink href="/login" passHref>
                  <MUILink
                    variant="body2"
                    sx={{ color: "black", fontSize: 14, fontWeight: 400 }}
                  >
                    Iniciar Sesión
                  </MUILink>
                </NextLink>
              </Box>
            )}
            {user && (
              <Box
                sx={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {user.id === 55 ? (
                  <NextLink href="/reportes" passHref>
                    <MUILink
                      variant="body2"
                      sx={{
                        color: "black",
                        fontSize: 14,
                        fontWeight: 800,
                        marginRight: 4,
                      }}
                    >
                      Reportes
                    </MUILink>
                  </NextLink>
                ) : (
                  <NextLink href="/mis-donaciones-proyectos" passHref>
                    <MUILink
                      variant="body2"
                      sx={{
                        color: "black",
                        fontSize: 14,
                        fontWeight: 400,
                        marginRight: 3,
                      }}
                    >
                      Donaciones y proyectos
                    </MUILink>
                  </NextLink>
                )}
                <NextLink href="/actualizacion-perfil" passHref>
                  <Image
                    src="/perfil.png"
                    width={45}
                    height={45}
                    alt="Perfil"
                  />
                </NextLink>
                <NextLink href="/login" passHref>
                  <MUILink
                    variant="body2"
                    sx={{
                      color: "black",
                      fontSize: 14,
                      fontWeight: 400,
                      marginLeft: 1,
                    }}
                  >
                    {user.name} {user.lastname}
                  </MUILink>
                </NextLink>
                <NextLink href="/" passHref>
                  <MUILink
                    variant="body2"
                    sx={{
                      color: "black",
                      fontSize: 14,
                      fontWeight: 400,
                      marginLeft: 3,
                    }}
                    onClick={() => {
                      Cookies.remove("access-confirmacion");
                      router.reload();
                    }}
                  >
                    Cerrar Sesión
                  </MUILink>
                </NextLink>
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </Container>
  );
};

const GeneralHeader: FC<Props> = ({ variant }: Props) => {
  return variant == "general" ? (
    <AppBar position="static">
      <Header variant={variant} />
    </AppBar>
  ) : (
    <Header variant={variant} />
  );
};

GeneralHeader.defaultProps = {
  variant: "general",
};

export default GeneralHeader;