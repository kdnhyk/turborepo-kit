export const getStoragePath = (
    src: string,
    width: number,
    height?: number,
    quality?: number,
  ) => {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${src}?width=${width}height=${width || height}&quality=${
      quality || 75
    }`
  }
  