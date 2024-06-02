export const helloWorld = async (name: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/hello-world`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      },
    )

    const data = await res.json()

    console.log(data)

    return data as string
  } catch (error) {
    console.log(error)
  }
}
