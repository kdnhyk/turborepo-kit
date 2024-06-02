import imageCompression, { Options } from 'browser-image-compression'

export const toCompressImage = async (
  file: File,
  options: Options = {
    maxSizeMB: 1,
    fileType: 'image/webp',
    useWebWorker: true,
  },
) => {
  const newFile = await imageCompression(file, options)
  const result = new File([newFile], file.name.split('.')[0] + '.webp', {
    type: 'image/webp',
    lastModified: new Date().getTime(),
  })

  return result
}
