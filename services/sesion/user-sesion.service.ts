import { IUser, ILogin, IUserRegister } from "interfaces/user.type";
import { API_URL, fetchApi } from "utils/servicesUtils";


export const postLogin = async (data: ILogin): Promise<any> => {
  const dataLogin = JSON.stringify(data);
  // const response = await fetch(`${API_URL}/login`,
  const response = await fetch(`/api/login`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: dataLogin,
    });

  return await response
};

export const postLoginAPI = async (data: ILogin): Promise<any> => {
  const response = await fetchApi(`auth/token`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: data
  });

  return await response;
};


export const postActualizacion = async (data: IUserRegister) => {
  const response = await fetchApi(`users`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

    },
    method: "Patch",
    body: data
  });
  return await response;
}



export const postRegistroApi = async (data: IUserRegister): Promise<any> => {
  const transformData =
  {
    ...data,
    profileUrl: "https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg",
    userType: {
      id: 1
    }
  }
  const dataRegistro = transformData

  const response = await fetchApi(`auth/register`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0bHVpc2FAZ21haWwuY29tIiwiaWF0IjoxNzAyMTIwMzYzLCJleHAiOjE3MDIxMjIxNjN9.WT1cTjFuwTDJW9apDnRvbpkGdaM7LWm4q8FUybGP5kk`
      },
      method: "POST",
      body: dataRegistro,
    });
  
  return await response
};

export const postRegistro = async (data: IUserRegister): Promise<any> => {
  const transformData =
  {
    ...data,
    profileUrl: "https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg",
    userType: {
      id: 1
    }
  }
  const dataRegistro = JSON.stringify(transformData);

  const response = await fetch(`/api/registro`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: dataRegistro,
    });

  return await response.json();
};