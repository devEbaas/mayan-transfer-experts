interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function Counter({ value, onIncrement, onDecrement }: CounterProps) {
  return (
    <div className="inline-flex items-center border border-border-input rounded-[10px] overflow-hidden">
      <button
        type="button"
        onClick={onDecrement}
        className="w-[34px] h-[34px] border-none bg-[#f5f7f9] text-navy text-lg font-bold cursor-pointer hover:bg-[#e9edf1]"
      >
        −
      </button>
      <span className="w-9 text-center text-[15px] font-bold text-navy">{value}</span>
      <button
        type="button"
        onClick={onIncrement}
        className="w-[34px] h-[34px] border-none bg-teal text-white text-lg font-bold cursor-pointer hover:bg-teal-dark"
      >
        +
      </button>
    </div>
  );
}
