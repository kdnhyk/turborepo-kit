import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const pageTitles: { [key: string]: string } = {
  '/': '홈',
  '/login': '로그인',
  '/profile': '프로필',
  '/posts': '글 목록',
}

export const Header = () => {
  const pathname = usePathname()
  const title = pageTitles[pathname] || '404'

  console.log(title)

  const router = useRouter()
  return (
    <header className="text-18 flex shrink-0 basis-12 items-center border-b bg-white">
      {title === '홈' ? (
        <div
          className="flex h-10 basis-10 cursor-pointer items-center justify-center"
          onClick={() => router.push('/')}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18.9994H9.69225V13.1149H14.3077V18.9994H18V9.99944L12 5.46094L6 9.99944V18.9994ZM5 19.9994V9.49944L12 4.21094L19 9.49944V19.9994H13.3077V14.1149H10.6923V19.9994H5Z"
              fill="black"
            />
          </svg>
        </div>
      ) : (
        <div
          className="flex h-10 basis-10 cursor-pointer items-center justify-center"
          onClick={() => router.back()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.3077 21.6155L7 12.3077L16.3077 3L17.3713 4.0635L9.127 12.3077L17.3713 20.552L16.3077 21.6155Z"
              fill="black"
            />
          </svg>
        </div>
      )}

      <p>{title}</p>
    </header>
  )
}
