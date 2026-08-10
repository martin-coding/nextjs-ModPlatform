import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { APIError } from "better-auth"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvatarInitials(name: string): string {
  const parts = name.trim().split(/\s+/)

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function getAuthErrorField(error: APIError): string {
  switch (error.body?.code) {
    case "USER_ALREADY_EXISTS":
    case "INVALID_EMAIL":
      return "email"

    case "USERNAME_IS_ALREADY_TAKEN":
    case "USERNAME_ALREADY_EXISTS":
      return "username"

    case "PASSWORD_TOO_SHORT":
    case "INVALID_PASSWORD":
      return "password"

    default:
      return "general"
  }
}
