import { NextRequest, NextResponse } from 'next/server';
import { URL_DOMAIN } from 'utils/servicesUtils';

export function middleware(req: NextRequest, res: NextResponse) {
  const cookieUser = req.cookies.get("access-confirmacion");
  const url = req.nextUrl.pathname;


  const redirectUrls = [
    "/actualizacion-perfil",
    "/donaciones",
    "/mis-donaciones-proyectos",
    "/nuevo-proyecto",
    "/reportes",
  ];

  if (!cookieUser && redirectUrls.some(redirectUrl => url.includes(redirectUrl))) {
    return NextResponse.redirect(`${URL_DOMAIN}`);
  }

  return NextResponse.next();
}

export const config = {
  // Definir aquí las rutas que quieres excluir del middleware
  exclude: ['/login', '/register'],
};

