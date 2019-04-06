import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/antd/3.10.9/antd.min.css" />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js"
            noModule="nomodule"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.4/fetch.min.js"
            noModule="nomodule"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
