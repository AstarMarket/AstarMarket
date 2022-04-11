export function truncate(text: string) {
  return `${text.slice(0, 6)}...${text.slice(-4)}`
}
