'use client';

import { useList } from '@refinedev/core';
import { KPIGame, PieChart } from '@/components/charts';
import { useDashboardStore } from '@/store';
import { IAnalyticItem } from '@/interfaces/analytic';
import { getYear } from '@/helper/getDate';

enum AnalyticMonthValue {
  visitors = 'visitors',
  google = 'google',
  facebook = 'facebook',
  instagram = 'instagram',
}

export default function Content() {
  const { userIds } = useDashboardStore();

  const { data, isLoading } = useList({
    resource: 'gameAnalytics',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: userIds?.sanityId,
      },
    ],
  });

  const { data: winners } = useList({
    resource: 'gameWinners',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: userIds?.sanityId,
      },
    ],
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
  // Calculate the total number of reviews without Google reviews
  const totalReviewsWithoutGoogle = allFacebookReviews + allInstagramReviews;

  // Get the total number of winners
  const allWinners = winners?.total;

  return (
    <>
      <h1 className="h4-medium text-white">Overview</h1>
      {/* TODO change Piachart by icon */}
      {/* -------------------------- List Pie Charts here -------------------------- */}
      <section className="pie-container">
        <PieChart title="Nombre de visites" value={allVisits} />
        <PieChart title="Nombre d'avis" value={allGoogleReviews} />
        <PieChart title="Nombre d'abonnés" value={totalReviewsWithoutGoogle} />
        <PieChart title="Gagnants" value={allWinners!} />
      </section>

      {/* -------------------------- Total Revenue Charts -------------------------- */}
      <KPIGame analytics={analytics} />
    </>
  );
}