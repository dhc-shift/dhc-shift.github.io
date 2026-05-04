import type { ReactNode } from "react";

const BLOCK_START = /^(#{1,3}\s|[-*]\s|\d+\.\s|>\s|---+$|```)/;

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(pattern)) {
    const token = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    if (token.startsWith("`")) {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else {
      nodes.push(
        <strong key={key++} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function isBlockStart(line: string): boolean {
  return BLOCK_START.test(line.trim());
}

export function MDXRemote({ source }: { source: string }) {
  const lines = source.trim().split(/\r?\n/);
  const nodes: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const code: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }

      nodes.push(
        <pre
          key={nodes.length}
          className="mb-4 overflow-x-auto rounded-xl bg-muted p-4 text-sm font-mono"
        >
          <code>{code.join("\n")}</code>
        </pre>
      );
      index += 1;
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const content = renderInline(heading[2]);

      if (level === 1) {
        nodes.push(
          <h1 key={nodes.length} className="text-2xl font-bold mt-8 mb-4">
            {content}
          </h1>
        );
      } else if (level === 2) {
        nodes.push(
          <h2 key={nodes.length} className="text-xl font-bold mt-6 mb-3">
            {content}
          </h2>
        );
      } else {
        nodes.push(
          <h3 key={nodes.length} className="text-lg font-semibold mt-5 mb-2">
            {content}
          </h3>
        );
      }

      index += 1;
      continue;
    }

    if (/^---+$/.test(line)) {
      nodes.push(<hr key={nodes.length} className="my-8 border-border" />);
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quotes: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith("> ")) {
        quotes.push(lines[index].trim().slice(2));
        index += 1;
      }

      nodes.push(
        <blockquote
          key={nodes.length}
          className="my-4 border-l-4 border-primary/30 pl-4 text-muted-foreground italic"
        >
          {renderInline(quotes.join(" "))}
        </blockquote>
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }

      nodes.push(
        <ul
          key={nodes.length}
          className="mb-4 ml-4 list-disc space-y-1 text-foreground/90"
        >
          {items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`} className="leading-7">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }

      nodes.push(
        <ol
          key={nodes.length}
          className="mb-4 ml-4 list-decimal space-y-1 text-foreground/90"
        >
          {items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`} className="leading-7">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    const paragraph = [line];
    index += 1;

    while (
      index < lines.length &&
      lines[index].trim() &&
      !isBlockStart(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }

    nodes.push(
      <p key={nodes.length} className="mb-4 leading-7 text-foreground/90">
        {renderInline(paragraph.join(" "))}
      </p>
    );
  }

  return <>{nodes}</>;
}
