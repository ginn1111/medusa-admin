import { useAdminGetSession } from "medusa-react"

const useUserRole = () => {
  const { user, isLoading } = useAdminGetSession()
  const isDev = user?.role === "developer"
  const isMem = user?.role === "member"
  const isAdmin = user?.role === "admin"

  return { isDev, isMem, isAdmin, isLoading }
}

export { useUserRole as default, useUserRole }
