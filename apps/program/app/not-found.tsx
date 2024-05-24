import { Page } from '@/(components)/layout/Page'

const NotFound = () => {
  return (
    <>
      <Page.Header title="Error" />
      <Page.Layout>
        <h1>404 Not Found</h1>
      </Page.Layout>
    </>
  )
}

export default NotFound
