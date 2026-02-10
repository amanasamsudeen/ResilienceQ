type Props = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: Props) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-1">
        <span>
          Question {current} of {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-blue-500 rounded transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
