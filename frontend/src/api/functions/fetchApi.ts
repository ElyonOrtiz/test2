import { api } from "../api"
export const getDataFromDB = async <T> (

): Promise<T> => {
  const res = await fetch(`${api}/satisfaction`, {
    cache: 'no-store',
    method: 'GET',
   
  })
  const {data} = await res.json()
  return data
}
