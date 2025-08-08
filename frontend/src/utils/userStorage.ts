export function saveUserToLocalStorage(user: {
  name: string
  email: string
  password?: string
  company?: string
  direccion?: string
  documento?: string
  telefono?: string
  isAuthenticated?: boolean
}) {
  localStorage.setItem("isAuthenticated", "true")
  localStorage.setItem("user", JSON.stringify(user))
}

export function getUserFromLocalStorage() {
  const data = localStorage.getItem("user")
  return data ? JSON.parse(data) : null
}

export function clearUserStorage() {
  localStorage.removeItem("isAuthenticated")
  localStorage.removeItem("user")
}