// Renders "plan in three *steps.*" with the starred words as italic accent text,
// so headings stay plain strings in content/.
export function AccentText({ text }: { text: string }) {
  const parts = text.split('*');
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <em key={`accent-${part}`} className="text-accent italic">
            {part}
          </em>
        ) : (
          part
        ),
      )}
    </>
  );
}
