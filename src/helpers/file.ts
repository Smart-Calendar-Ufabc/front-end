export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async function () {
      let base64data = reader.result as string
      base64data = base64data.replace(
        /^data:(.*);base64,/,
        `data:$1;charset=utf-8;base64,`,
      )
      resolve(base64data)
    }
    reader.onerror = function () {
      reject(new Error('Error reading file'))
    }
  })
}
