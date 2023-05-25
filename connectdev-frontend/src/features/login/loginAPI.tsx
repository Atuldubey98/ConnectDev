import instance, { baseURL } from "../../axios"

export async function login(email: string, password: string) {
  try {
    return instance.post(baseURL + "/api/users/login", {
      email,
      password,
    })
  } catch (error) {
    throw error
  }
}
export async function load() {
  try {
    return instance.get("/api/users")
  } catch (error) {
    throw error
  }
}

export async function logout() {
  try {
    return instance.post("/api/users/logout")
  } catch (error) {
    throw error
  }
}
