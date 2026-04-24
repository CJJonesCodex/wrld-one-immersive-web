interface ScrollbarNavProps {
  count: number;
  activeIndex: number;
  progress: number;
  onSelect: (index: number) => void;
}

export function ScrollbarNav({ count, activeIndex, progress, onSelect }: ScrollbarNavProps) {
  return (
    <aside className="scrollbar-nav" aria-label="Scroll progress navigator">
      <div className="scrollbar-track">
        <span style={{ transform: `scaleY(${progress})` }} />
      </div>
      <div className="scrollbar-ticks">
        {Array.from({ length: count }).map((_, index) => (
          <button
            type="button"
            key={`tick-${index}`}
            aria-label={`Navigate to world ${index + 1}`}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => onSelect(index)}
            data-cursor="interactive"
          />
        ))}
      </div>
    </aside>
  );
}
