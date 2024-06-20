import { api } from "../api";
import Cookies from "js-cookie";

type IData = {
  email?: string;
  password?: string;
};
export async function login({ email, password }: IData) {
  const data = {
    email,
    password,
  };

  const response = await api.post("/user", data)
  api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;
  Cookies.set("access_token", response.data.accessToken, {
    expires: 1,
  })
}
