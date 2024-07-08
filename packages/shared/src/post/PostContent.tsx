import { kstFormat } from '@repo/utils/date'
import { Section } from '../layout/Section'
import { SafeImage } from '@repo/ui/SafeImage'
import { PostType } from '@repo/api/post'
import { PostMusicList } from './PostMusicList'
import { PostViewCount } from './PostViewCount'

export function PostContent({
  post: { id, title, updated_at, image, content, music },
}: {
  post: PostType
}) {
  return (
    <Section className="gap-0 divide-y p-0 sm:gap-0 sm:p-0 [&>*]:border-dashed">
      <div className="flex items-end justify-between p-2 sm:p-3">
        <h4 className="text-lg font-bold sm:text-xl">{title}</h4>
        <p className="text-xs text-black/50">
          updated at {kstFormat(updated_at, 0, 'yyyy-MM-dd HH:mm:ss')}
        </p>
      </div>
      {(image || content) && (
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
      )}
      <div className="flex-1">
        <PostMusicList music={music} />
      </div>
      <div className="flex justify-end p-2 sm:p-3">
        <PostViewCount id={id} />
      </div>
    </Section>
  )
}
