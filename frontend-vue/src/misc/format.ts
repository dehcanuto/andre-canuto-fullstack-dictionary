export const formatUserName = (name?: string): string => {
  if (!name) return ''
  const arrayName = name.split(' ')
  return  arrayName.length === 1 ?
    arrayName[0][0].toLocaleUpperCase() :
    arrayName[0][0].toLocaleUpperCase() + arrayName[1][0].toLocaleUpperCase()
}
