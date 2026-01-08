import * as Slider from "@radix-ui/react-slider";

interface Props {
  min: number;
  max: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}

function AmountRangeSlider({ min, max, value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>

      <Slider.Root
        min={min}
        max={max}
        step={10}
        value={value}
        onValueChange={(v) => onChange(v as [number, number])}
        className="relative flex items-center select-none h-5"
      >
        <Slider.Track className="bg-muted h-1 rounded w-full">
          <Slider.Range className="bg-[#3A12FF] h-full rounded" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-white border rounded-full" />
        <Slider.Thumb className="block w-4 h-4 bg-white border rounded-full" />
      </Slider.Root>
    </div>
  );
}

export default AmountRangeSlider;
