type Props = {
  value: number | null;
  onChange: (value: number) => void;
};

export default function LikertOptions({ value, onChange }: Props) {
  const options = [
    { score: 1, label: "Not at all" },
    { score: 2, label: "Marginally" },
    { score: 3, label: "Moderately" },
    { score: 4, label: "Largely" },
    { score: 5, label: "Most appropriate" },
  ];

  return (
    <div className="mt-4">
      <div className="grid grid-cols-5 gap-4 text-center">
        {options.map(({ score, label }) => {
          const isSelected = value === score;

          return (
            <label
              key={score}
              className={`cursor-pointer border rounded-lg p-2 flex flex-col items-center justify-center transition-all
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-100 text-blue-700"
                    : "border-gray-400 text-gray-700 hover:border-blue-400"
                }
              `}
              onClick={() => onChange(score)}
            >
              <span className="text-lg font-bold">{score}</span>
              <span className="text-xs mt-1">{label}</span>
              <input
                type="radio"
                name="likert"
                className="hidden"
                checked={isSelected}
                onChange={() => onChange(score)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
