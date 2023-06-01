import { io } from "socket.io-client"
import { baseURL } from "./axios"

const URL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : baseURL
const socket = io(URL, {
  autoConnect: false,
  withCredentials: true,
})
export default socket
