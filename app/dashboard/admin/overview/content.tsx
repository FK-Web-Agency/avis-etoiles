'use client';

import { PieChart, TotalRevenue } from '@/components/charts';
import { Icons } from '@/components/shared';
import { Spinner } from '@/components/shared';
import { classNames } from '@/helper';
import { IAnalytics } from '@/interfaces';
import { useList } from '@refinedev/core';

const IconOverview = ({ Icon, backgroundColor }: { Icon: any; backgroundColor: string }) => (
  <div className={classNames('p-3 rounded-full', backgroundColor)}>
    <Icon className="w-5 h-5 text-slate-50" />
  </div>
);

export default function Content() {
  const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_GAME_ANALYTICS,
  });

  const { data: dataWinner } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_GAME_WINNERS,
  });

  const { data: dataOrders } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_ORDERS,
  });

  const { data: dataUsers } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS,
  });

  if (isLoading) return <Spinner />;

  const allAnalytics = data?.data;
  const allWinners = dataWinner?.data;
  const orders = dataOrders?.data;

  // Calculate the total revenue for a specific platform
  const calculateTotal = (platform: string) => {
    return allAnalytics?.reduce((total, analytic) => {
      return (
        total +
        (analytic?.analytics?.reduce((analyticsTotal: number, analyticItem: IAnalytics) => {
          return (
            // @ts-ignore
            analyticsTotal + (analyticItem.months?.reduce((monthTotal, month) => monthTotal + month[platform], 0) || 0)
          );
        }, 0) || 0)
      );
    }, 0);
  };

  const totalFacebookSubscribers = calculateTotal('facebook');
  const totalInstagramSubscribers = calculateTotal('instagram');
  const totalReviews = calculateTotal('google');

  const totalWinners = allWinners?.reduce((total, winner) => {
    return total + winner.winners.length;
  }, 0);

  const totalYearSum = orders?.reduce((sum, order) => sum + order.price, 0);

  const totalYearSumToString = Number((totalYearSum! / 100).toFixed(2));

  return (
    <>
      <h1 className="h4-medium text-white">Overview</h1>

      {/* Render the pie charts Icons.Euro*/}
      <section className="pie-container">
        <PieChart
          title="Revenue Total"
          value={totalYearSumToString}
          Icon={
            <IconOverview
              Icon={Icons.Euro}
              backgroundColor={'bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900'}
            />
          }
        />
        <PieChart
          title="Abonnés"
          value={dataUsers?.total!}
          Icon={
            <IconOverview Icon={Icons.Subscribe} backgroundColor={'bg-gradient-to-r from-violet-300 to-violet-400'} />
          }
        />
        <PieChart
          title="Avis recueillis"
          value={totalReviews as number}
          Icon={<IconOverview Icon={Icons.Comment} backgroundColor={'bg-gradient-to-r from-rose-300 to-rose-500'} />}
        />
        <PieChart
          title="Cadeaux gagnés"
          value={totalWinners!}
          Icon={<IconOverview Icon={Icons.Gift} backgroundColor={'bg-gradient-to-r from-yellow-200 to-yellow-500'} />}
        />
      </section>

      {/* Render the total revenue chart */}
      <TotalRevenue />
    </>
  );
}
