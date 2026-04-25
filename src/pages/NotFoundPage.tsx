import { ButtonLink, EmptyState } from '@/components/ui';

export const NotFoundPage = () => {
  return (
    <EmptyState
      className="mt-12"
      title="Nothing here"
      description="This page is not part of BeerMap yet."
      action={<ButtonLink href="/">Go home</ButtonLink>}
    />
  );
};
