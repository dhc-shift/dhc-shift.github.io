import { Clock, MapPin, BookOpen } from "lucide-react";

const INFO = [
  { icon: Clock, label: "정기모임", value: "매주 수요일 15:00" },
  { icon: MapPin, label: "활동 장소", value: "학과 세미나실 / 온라인 병행" },
  { icon: BookOpen, label: "운영 방식", value: "세미나 · 스터디 · 팀 프로젝트" },
];

export function InfoStrip() {
  return (
    <div className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-5xl px-6 py-6">
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {INFO.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2.5 shrink-0">
                <Icon size={18} className="text-primary" />
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="text-sm font-semibold">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
