import { kstFormat } from '@repo/utils/date'
import { Section } from '../layout/Section'
import { SafeImage } from '@repo/ui/SafeImage'
import { PostType } from '@repo/api/post'
import { PostMusicList } from './PostMusicList'

export function PostContent({
  post: { title, created_at, image, content, music },
}: {
  post: PostType
}) {
  return (
    <Section className="gap-0 divide-y p-0 sm:gap-0 sm:p-0 [&>*]:border-dashed">
      <h4 className="p-2 text-lg font-bold sm:p-3 sm:text-xl">{title}</h4>
      <div className="flex flex-col sm:flex-row">
        {image && (
          <div className="flex justify-start">
            <SafeImage
              className="aspect-square w-full border-dashed object-cover sm:w-[400px] sm:border-r"
              src={`post/${image}`}
              alt={title}
              width={400}
              height={400}
              opacity
            />
          </div>
        )}
        {content && <p className="whitespace-pre p-2 sm:p-3">{content}</p>}
      </div>
      <div className="flex-1">
        <PostMusicList music={music} />
      </div>
      <p className="p-2 text-end text-sm text-zinc-700 sm:p-3">
        {kstFormat(created_at)}
      </p>
    </Section>
  )
}
