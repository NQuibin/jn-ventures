import { SpotService } from '@/services/spot/service';
import PageLayout from '../features/common/components/PageLayout';
import PageHeader from '../features/common/components/PageHeader';
import SpotCard from '../features/spot/components/SpotCard';

export const getServerSideProps = async () => {
  const spots = await new SpotService().listSpots();

  return {
    props: { spots },
  };
};

const Home = ({ spots }) => {
  const buildSpotCards = () => {
    return spots.map(spot => {
      return (
        <div key={spot.key} className="w-full sm:w-1/2 md:w-1/3">
          <SpotCard spot={spot} />
        </div>
      );
    });
  };

  return (
    <PageLayout headTitle="Food spots">
      <PageHeader />
      <div className="max-w-2xl mx-auto p-4 flex">{buildSpotCards()}</div>
    </PageLayout>
  );
};

export default Home;
