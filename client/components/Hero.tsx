import Link from "next/link";

export default function Hero({user} : any) {
  if (user.storeId) {
    return (
      <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Welcome back
            <strong className="font-extrabold text-violet-700 sm:block">
              {user.name}
            </strong>
          </h1>
          {/* <p className="mt-4 sm:text-xl sm:leading-relaxed">
            Just give us a name, add your products and you are ready to go.
          </p> */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/admin" passHref>
              <a className="block w-full rounded bg-violet-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-violet-700 focus:outline-none focus:ring active:bg-violet-500 sm:w-auto">
                GO TO YOUR DASHBOARD
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
    )
  }
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Create your own online shop
            <strong className="font-extrabold text-violet-700 sm:block">
              Within minutes
            </strong>
          </h1>
          <p className="mt-4 sm:text-xl sm:leading-relaxed">
            Just give us a name, add your products and you are ready to go.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/open-shop" passHref>
              <a className="block w-full rounded bg-violet-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-violet-700 focus:outline-none focus:ring active:bg-violet-500 sm:w-auto">
                OPEN A SHOP
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>)
}