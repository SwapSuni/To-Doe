import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel='icon' href={'/icon.jfif'}></link>
      </Head>
      <body>
        <Main>
        <link href="https://fonts.googleapis.com/css2?family=Gemunu+Libre:wght@300&family=Playfair+Display&display=swap" rel="stylesheet"/>
        </Main>
        <NextScript />
      </body>
    </Html>
  )
}
