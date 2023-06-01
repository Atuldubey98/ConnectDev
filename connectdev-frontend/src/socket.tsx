import { io } from "socket.io-client"

const URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL
  : "http://localhost:9000"

const socket = io(URL, {
  autoConnect: false,
  withCredentials: true,
})
export default socket
