export default function AdSlot() {
  return (
    <div className="ad-slot my-8 p-8 bg-cosmic-gray/30 border border-cosmic-purple/20 rounded-xl text-center">
      <p className="text-cosmic-white/40 text-sm mb-2">廣告區域</p>
      <p className="text-cosmic-white/30 text-xs">
        此處將放置 Google AdSense 或其他廣告
      </p>
      <div className="mt-4 text-cosmic-white/20 text-xs">
        [ 300x250 或 728x90 廣告單元 ]
      </div>
    </div>
  );
}
