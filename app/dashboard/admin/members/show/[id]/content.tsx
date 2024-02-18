'use client';

import { useList, useOne } from '@refinedev/core';
import { KPIGame, PieChart, TrafficSocial } from '@/components/charts';
import { IAnalyticItem } from '@/interfaces/analytic';
import { getYear } from '@/helper/getDate';
import { classNames } from '@/helper';
import { GoBack, Icons } from '@/components/shared';

enum AnalyticMonthValue {
  visitors = 'visitors',
  google = 'google',
  facebook = 'facebook',
  instagram = 'instagram',
  tiktok = 'tiktok',
}

const IconOverview = ({ Icon, backgroundColor }: { Icon: any; backgroundColor: string }) => (
  <div className={classNames('p-3 rounded-full', backgroundColor)}>
    <Icon className="w-5 h-5 text-slate-50" />
  </div>
);

export default function Content({ id }: { id: string }) {
  const { data, isLoading } = useList({
    resource: 'gameAnalytics',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: id,
      },
    ],
  });

  const { data: winners } = useList({
    resource: 'gameWinners',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: id,
      },
    ],
  });

  const {data:subscriber} = useOne({
    resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS,
    id,
  });

  const analytics = data?.data[0]?.analytics;

  const currentYear = new Date().getFullYear();

  const retrieveValue = (target: AnalyticMonthValue) => {
    return analytics?.reduce(
      (acc: number, curr: IAnalyticItem) => getYear(curr.year) === currentYear && acc + curr.months[0][target],
      0
    );
  };

  // Calculate the total number of visits
  const allVisits = retrieveValue(AnalyticMonthValue.visitors);

  // Calculate the total number of Google reviews
  const allGoogleReviews = retrieveValue(AnalyticMonthValue.google);
  // Calculate the total number of Facebook reviews
  const allFacebookReviews = retrieveValue(AnalyticMonthValue.facebook);

  // Calculate the total number of Instagram reviews
  const allInstagramReviews = retrieveValue(AnalyticMonthValue.instagram);
  // const allTiktokReviews = retrieveValue(AnalyticMonthValue.tiktok);
  // Calculate the total number of reviews without Google reviews
  const totalReviewsWithoutGoogle = allFacebookReviews + allInstagramReviews;

  // Get the total number of winners
  const allWinners = winners?.data[0]?.winners.length;

  return (
    <>
      <GoBack resource="members" action="list" label={subscriber?.data?.companyName} />
      {/* TODO change Piachart by icon */}
      {/* -------------------------- List Pie Charts here -------------------------- */}
      <section className="pie-container">
        <PieChart
          title="Nombre de visites"
          value={allVisits || 0}
          Icon={
            <IconOverview
              Icon={Icons.Stats}
              backgroundColor={'bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900'}
            />
          }
        />
        <PieChart
          title="Avis Google"
          value={allGoogleReviews || 0}
          Icon={<IconOverview Icon={Icons.Google} backgroundColor={'bg-gradient-to-r from-gray-100 to-gray-300'} />}
        />
        <PieChart
          title="Interactions réseaux sociaux"
          value={totalReviewsWithoutGoogle || 0}
          Icon={
            <IconOverview
              Icon={Icons.Share}
              backgroundColor={
                'bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200'
              }
            />
          }
        />
        <PieChart
          title="Gagnants"
          value={allWinners! || 0}
          Icon={
            <IconOverview
              Icon={Icons.Gift}
              backgroundColor={'bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700'}
            />
          }
        />
      </section>

      <TrafficSocial analytics={analytics} />
      {/* -------------------------- Total Revenue Charts -------------------------- */}
      <KPIGame analytics={analytics} />
    </>
  );
}
