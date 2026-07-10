import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Reno Notice Board — Campus & Institute Announcements</title>
        <meta
          name="description"
          content="Real-time institutional notice board supporting full Create, Read, Update, and Delete with server-side validation and urgent-first sorting."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Component {...pageProps} />
      </div>
    </>
  );
}
