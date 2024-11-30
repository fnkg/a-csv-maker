export default function ErrorMessage({ error }) {
  if (!error) return null;
  return <h3 className='text-red-500 text-sm mb-4 absolute top-9 left-21'>{error}</h3>;
}
