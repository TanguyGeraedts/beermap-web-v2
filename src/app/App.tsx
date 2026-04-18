import appPreview from '../assets/app-preview.svg';

const App = () => {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-950">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            BeerMap v2
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            A fresh map for every good drink.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-700">
            Log the drink, pin the place, keep the story. This new build starts
            clean so every feature can move over in focused, modular slices.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
              href="/"
            >
              Start mapping
            </a>
            <a
              className="rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:border-teal-600 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
              href="/manifest.webmanifest"
            >
              View manifest
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            className="w-full max-w-md"
            src={appPreview}
            alt="BeerMap app preview"
          />
        </div>
      </section>
    </main>
  );
};

export default App;
