import type { AboutPageContent } from "@/lib/site-content";

export function ShiftMeaning({
  section,
  letters,
}: {
  section: AboutPageContent["shiftSection"];
  letters: AboutPageContent["shiftLetters"];
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">{section.title}</h2>
      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-3 text-left font-semibold w-12">{section.letterHeader}</th>
              <th className="px-6 py-3 text-left font-semibold">{section.wordHeader}</th>
              <th className="px-6 py-3 text-left font-semibold text-muted-foreground">
                {section.descriptionHeader}
              </th>
            </tr>
          </thead>
          <tbody>
            {letters.map(({ letter, word, description }, index) => (
              <tr key={letter} className={index % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                <td className="px-6 py-4 font-black text-xl text-primary">{letter}</td>
                <td className="px-6 py-4 font-semibold">{word}</td>
                <td className="px-6 py-4 text-muted-foreground">{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
