export function isFresh(updatedAt, hours) {
  if (!updatedAt) return false;
  return (
    new Date(updatedAt).getTime() >
    Date.now() - hours * 60 * 60 * 1000
  );
}
