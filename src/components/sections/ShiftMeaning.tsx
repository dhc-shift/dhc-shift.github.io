const LETTERS = [
  { letter: "S", word: "Structured", desc: "체계적인 커리큘럼과 기록" },
  { letter: "H", word: "Healthcare", desc: "헬스케어 문제에 대한 관심" },
  { letter: "I", word: "Innovative", desc: "새로운 기술과 서비스 탐색" },
  { letter: "F", word: "Focused", desc: "학기별 목표 중심 운영" },
  { letter: "T", word: "Team", desc: "팀 기반 협업과 피드백" },
];

export function ShiftMeaning() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">SHIFT의 의미</h2>
      <div className="rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-3 text-left font-semibold w-12">글자</th>
              <th className="px-6 py-3 text-left font-semibold">의미</th>
              <th className="px-6 py-3 text-left font-semibold text-muted-foreground">설명</th>
            </tr>
          </thead>
          <tbody>
            {LETTERS.map(({ letter, word, desc }, i) => (
              <tr key={letter} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                <td className="px-6 py-4 font-black text-xl text-primary">{letter}</td>
                <td className="px-6 py-4 font-semibold">{word}</td>
                <td className="px-6 py-4 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
