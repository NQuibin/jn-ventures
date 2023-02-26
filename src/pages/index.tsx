import { SpotService } from '@/services/spots/service';
import PageLayout from '../features/common/components/PageLayout';
import PageHeader from '../features/common/components/PageHeader';

export const getServerSideProps = async () => {
  const spots = await new SpotService().listSpots();

  return {
    props: {},
  };
};

export default function Home() {
  return (
    <PageLayout headTitle="Food spots">
      <PageHeader />
    </PageLayout>
  );
}
