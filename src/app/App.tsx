import appPreview from '../assets/app-preview.svg';
import { ButtonLink, Card, EmptyState, PageHeader } from '../shared/ui';

const App = () => {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-950">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <PageHeader
            eyebrow="BeerMap v2"
            title="A fresh map for every good drink."
            description="Log the drink, pin the place, keep the story. This new build starts clean so every feature can move over in focused, modular slices."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/">
              Start mapping
            </ButtonLink>
            <ButtonLink href="/manifest.webmanifest" variant="secondary">
              View manifest
            </ButtonLink>
          </div>
          <Card className="mt-8 max-w-xl">
            <p className="text-sm font-semibold text-zinc-950">
              Shared UI foundation
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Buttons, cards, inputs, fields, page headers, and empty states are
              ready under <code>src/shared/ui</code>.
            </p>
          </Card>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="grid w-full max-w-md gap-4">
            <img className="w-full" src={appPreview} alt="BeerMap app preview" />
            <EmptyState
              title="No logs yet"
              description="Your first migrated feature can plug into the same shared pieces."
              action={
                <ButtonLink href="/docs" size="sm" variant="ghost">
                  Keep it modular
                </ButtonLink>
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
