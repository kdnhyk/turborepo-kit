import { Page } from '@/(components)/layout/Page'

const PostsPage = () => {
  return (
    <>
      <Page.Header title="Posts" />
      <Page.Layout>
        <p className="text-xl italic">Do it yourself 😉</p>
      </Page.Layout>
    </>
  )
}

export default PostsPage
