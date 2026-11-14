import { APIError } from "better-auth"

export { cn } from "cn"

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

export const formatCompactNumber = (value: number): string => {
  const abs = Math.abs(value)

  if (abs >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B"
  }

  if (abs >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
  }

  if (abs >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "K"
  }

  return value.toString()
}

export const timeAgo = (date: Date): string => {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 5) return "just now"

  const intervals: { label: string; seconds: number }[] = [
    { label: "year", seconds: 60 * 60 * 24 * 365 },
    { label: "month", seconds: 60 * 60 * 24 * 30 },
    { label: "day", seconds: 60 * 60 * 24 },
    { label: "hour", seconds: 60 * 60 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`
    }
  }

  return "just now"
}

export const dateString = (date: Date): string => {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, -1, totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, -1, totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages]
}

// TODO: Does /games make sense?
export const getImageUrl = (image: string): string => {
  // This function is only for game images
  const imageSrc = image
    ? `http://localhost:8333/modplatform/images/games${image}`
    : "/game.png"
  return imageSrc
}
