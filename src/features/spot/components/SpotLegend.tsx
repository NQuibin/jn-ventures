import { AiTwotoneHeart } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { Icon } from '@chakra-ui/react';

interface SpotLegendProps {
  className: string;
}

export default function SpotLegend({ className }: SpotLegendProps) {
  return (
    <div className={`${className} flex`}>
      <span className="inline-flex mr-4 items-center">
        <Icon as={AiTwotoneHeart} color="#eb2f96" className="mr-1.5 mb-0.5" />
        Visited
      </span>
      <span className="inline-flex items-center">
        <Icon as={BsCheck2Circle} color="green" className="mr-1.5 mb-0.5" />
        Favourite
      </span>
    </div>
  );
}
