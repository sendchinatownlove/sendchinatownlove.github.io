export function validateHexcode(code: string){
  const validPattern = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
  
  return validPattern.test(code)
}