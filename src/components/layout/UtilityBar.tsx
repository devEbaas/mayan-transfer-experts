export default function UtilityBar() {
  return (
    <div className="bg-navy-dark text-[#cdd7e2] text-[12.5px] tracking-wide">
      <div className="max-w-[1200px] mx-auto px-6 py-2 flex items-center justify-between gap-5 flex-wrap">
        <div className="flex items-center gap-5 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="text-teal-glow">●</span> Cancún +1 346 420 5083
          </span>
          <span className="flex items-center gap-1.5">
            ✉ reservaweb@cancuntransferhotels.com
          </span>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[#9fb0c0]">USA/Canada Toll Free 1 (800) 905-5513</span>
          <span className="flex gap-2.5 text-[#9fb0c0]">
            <a href="#" className="hover:text-teal-glow transition-colors">Fb</a>
            <a href="#" className="hover:text-teal-glow transition-colors">Ig</a>
            <a href="#" className="hover:text-teal-glow transition-colors">Yt</a>
          </span>
        </div>
      </div>
    </div>
  );
}
