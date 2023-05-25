import instance from "../../axios"

export const loadProfile = async () => {
  return instance.get("/api/profile");
}
