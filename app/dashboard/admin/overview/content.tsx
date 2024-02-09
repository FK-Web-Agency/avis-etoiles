'use client';

import { PieChart, TotalRevenue } from '@/components/charts';
import { Icons } from '@/components/shared';
import { Spinner } from '@/components/shared';
import { classNames } from '@/helper';
import { IAnalytics } from '@/interfaces';
import { useList } from '@refinedev/core';

const IconOverview = ({ Icon, backgroundColor }: { Icon: any; backgroundColor: string }) => (
  <div className={classNames('p-2 rounded-full', backgroundColor)}>
    <Icon className="w-4 h-4 text-slate-50" />
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
    resource: 'orders',
  });

  const { data: dataUsers } = useList({
    resource: 'users',
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
        (analytic.analytics?.reduce((analyticsTotal: number, analyticItem: IAnalytics) => {
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

  const totalYearSum = orders?.reduce((sum, order) => sum + order.totalAmount, 0);

  const totalYearSumToString = Number((totalYearSum! / 100).toFixed(2));

  return (
    <>
      <h1 className="h4-medium text-white">Overview</h1>

      {/* Render the pie charts Icons.Euro*/}
      <section className="pie-container">
        <PieChart
          title="Revenue Total"
          value={totalYearSumToString}
          Icon={<IconOverview Icon={Icons.Euro} backgroundColor={'bg-red-300'} />}
        />
        <PieChart
          title="Membres"
          value={dataUsers?.total!}
          Icon={<IconOverview Icon={Icons.Subscribe} backgroundColor={'bg-indigo-200'} />}
        />
        <PieChart
          title="Avis recueillis"
          value={totalReviews as number}
          Icon={<IconOverview Icon={Icons.Comment} backgroundColor={'bg-black'} />}
        />
        <PieChart
          title="Cadeaux gagnés"
          value={totalWinners!}
          Icon={<IconOverview Icon={Icons.Gift} backgroundColor={'bg-green-400'} />}
        />
      </section>

      {/* Render the total revenue chart */}
      <TotalRevenue />
    </>
  );
}
