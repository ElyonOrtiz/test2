import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

export function Logout() {
  const router = useRouter()
  Cookies.remove("access_token");
  router.push("/");
}
