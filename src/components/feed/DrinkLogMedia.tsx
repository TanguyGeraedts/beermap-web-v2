type DrinkLogMediaProps = {
  photoUrl: string;
  drinkName: string;
};

export const DrinkLogMedia = ({
  photoUrl,
  drinkName
}: DrinkLogMediaProps) => {
  return (
    <img
      alt={drinkName}
      className="aspect-[16/10] w-full rounded-2xl border border-[var(--color-border)] object-cover"
      src={photoUrl}
    />
  );
};
