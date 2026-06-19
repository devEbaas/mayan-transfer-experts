export default function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div
      className="border-2 border-teal border-t-transparent rounded-full animate-spin"
      style={{ width: size, height: size }}
    />
  );
}
