import { CheckCircleTwoTone, HeartTwoTone } from '@ant-design/icons';

interface SpotLegendProps {
  className?: string;
}

export default function SpotLegend({ className }: SpotLegendProps) {
  return (
    <div className={`${className} flex text-xs`}>
      <span className="inline-flex mr-2 items-center">
        <HeartTwoTone twoToneColor="#eb2f96" className="mr-1" />
        Favourite
      </span>
      <span className="inline-flex items-center">
        <CheckCircleTwoTone twoToneColor="#52c41a" className="mr-1" />
        Visited
      </span>
    </div>
  );
}
