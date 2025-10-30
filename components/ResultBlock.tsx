interface ResultBlockProps {
  label: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  advice: string;
  starNote?: string;
}

export default function ResultBlock({
  label,
  summary,
  strengths,
  weaknesses,
  advice,
  starNote,
}: ResultBlockProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white px-8 py-3 rounded-full text-2xl font-bold mb-4">
          {label}
        </div>
        <p className="text-lg text-cosmic-white/80 max-w-2xl mx-auto">
          {summary}
        </p>
      </div>

      {/* Strengths */}
      <div className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-cosmic-white mb-4 flex items-center">
          <span className="mr-2">✨</span>
          你的優勢
        </h3>
        <ul className="space-y-2">
          {strengths.map((strength, index) => (
            <li key={index} className="text-cosmic-white/80 flex items-start">
              <span className="text-cosmic-purple mr-2">▸</span>
              {strength}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-cosmic-white mb-4 flex items-center">
          <span className="mr-2">🔍</span>
          需要覺察的盲點
        </h3>
        <ul className="space-y-2">
          {weaknesses.map((weakness, index) => (
            <li key={index} className="text-cosmic-white/80 flex items-start">
              <span className="text-cosmic-purple mr-2">▸</span>
              {weakness}
            </li>
          ))}
        </ul>
      </div>

      {/* Advice */}
      <div className="bg-gradient-to-r from-cosmic-purple/20 to-cosmic-pink/20 backdrop-blur-sm border border-cosmic-purple/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-cosmic-white mb-4 flex items-center">
          <span className="mr-2">💡</span>
          給你的建議
        </h3>
        <p className="text-cosmic-white/90 leading-relaxed">{advice}</p>
      </div>

      {/* Star Note */}
      {starNote && (
        <div className="bg-gradient-to-r from-cosmic-navy to-cosmic-gray backdrop-blur-sm border border-cosmic-purple rounded-xl p-6">
          <h3 className="text-xl font-semibold text-cosmic-white mb-4 flex items-center">
            <span className="mr-2">⭐</span>
            星語提醒
          </h3>
          <p className="text-cosmic-white/90 leading-relaxed italic">
            {starNote}
          </p>
        </div>
      )}
    </div>
  );
}
