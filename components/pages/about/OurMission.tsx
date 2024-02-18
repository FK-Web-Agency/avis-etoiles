import { MissionSectionProps } from '@/interfaces/sanity';
import { PortableText } from '@portabletext/react';

type OurMissionProps = {
  mission_section: MissionSectionProps;
};

export default function OurMission({ mission_section }: OurMissionProps) {
  return (
    <section className="yellow-section py-24">
      <div className="wrapper section">
        <div className="mx-auto max-w-3xl lg:mx-0">
          <h2 className="h2-bold mb-5">{mission_section?.title} </h2>
          <div className="text">
            {mission_section?.subtitle.map((item: any, index: number) => (
              <PortableText key={index} value={item} />
            ))}
          </div>
        </div>
        <div>
          <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {mission_section?.values.map((value: any) => (
              <div key={value.name}>
                <dt className="font-semibold text-gray-900">{value.name}</dt>
                <dd className="mt-1">{value?.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
