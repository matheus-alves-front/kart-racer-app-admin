export function cn(...inputs: string[]) {
  return `${inputs.map(classname => `${classname}`)}`
}