import instance from "../../axios"

export async function register(email: string, name: string, password: string) {
  try {
    return instance.post("/api/users/register", {
      email,
      password,
      name,
    })
  } catch (error) {
    throw error
  }
}
