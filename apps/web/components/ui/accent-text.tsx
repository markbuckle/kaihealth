import { Fragment } from 'react';

// Renders "plan in three *steps.*" with the starred words as italic accent text,
// and "**steps.**" as accent colour without italics, so headings stay plain
// strings in content/. A "\n" becomes a line break.
const accentPattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/;

export function AccentText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, lineIndex) => (
        <Fragment key={`line-${line}`}>
          {lineIndex > 0 && <br />}
          {line.split(accentPattern).map((part) => {
            if (part.startsWith('**')) {
              return (
                <span key={`accent-${part}`} className="text-accent">
                  {part.slice(2, -2)}
                </span>
              );
            }
            if (part.startsWith('*')) {
              return (
                <em key={`accent-${part}`} className="text-accent italic">
                  {part.slice(1, -1)}
                </em>
              );
            }
            return part;
          })}
        </Fragment>
      ))}
    </>
  );
}
