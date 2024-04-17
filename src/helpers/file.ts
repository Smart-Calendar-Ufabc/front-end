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

export const downloadJSON = ({
  data,
  fileName,
}: {
  data: object
  fileName: string
}) => {
  const json = JSON.stringify(data)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}

export const uploadJSON = async <T>(file: File): Promise<T> => {
  const base64 = await fileToBase64(file)
  const binaryString = atob(base64.split(',')[1])
  const decoder = new TextDecoder('utf-8')
  const json = decoder.decode(
    new Uint8Array(binaryString.split('').map((char) => char.charCodeAt(0))),
  )
  return JSON.parse(json) as T
}
