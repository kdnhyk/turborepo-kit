export function PostPageListSkeleton() {
  return (
    <ul className="flex flex-wrap items-start justify-center gap-2 md:gap-4">
      {new Array(12).fill(0).map((_, index) => {
        return (
          <li
            className="flex h-[120px] min-w-[240px] shrink-0 grow divide-x border bg-white shadow-inner md:max-w-[300px]"
            key={index}
          >
            <div className="relative flex flex-1 flex-col p-2">
              <div className="flex flex-1 flex-col text-black">
                <h2 className="line-clamp-1 w-[120px] text-lg font-bold"></h2>
                <p className="line-clamp-2 w-[100px] flex-1 text-sm"></p>
                <p className="w-[80px] text-end text-sm text-black/50"></p>
              </div>
            </div>
            <div className="basis-[80px] overflow-hidden"></div>
          </li>
        )
      })}
    </ul>
  )
}
