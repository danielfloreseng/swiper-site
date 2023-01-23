import { trackOutbound } from 'src/shared/track-outbound';
import sponsors from '../shared/sponsors-list.json';

export default function FooterSponsors() {
  return (
    <div className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
      {sponsors
        .filter(({ plan }) => plan !== 'Sponsor')
        .map(({ link, title, image, image_h, alt }) => {
          return (
            <a
              className="relative flex h-16 items-center justify-center rounded border p-1 text-center hover:bg-gray-50 dark:border-none dark:bg-white"
              href={link}
              key={title}
              title={title}
              rel="noopener"
              target="_blank"
              onClick={() => trackOutbound(link)}
            >
              <img
                className="max-h-[56px] w-auto max-w-full rounded"
                src={`/images/sponsors/${image_h || image}`}
                alt={title}
              />
            </a>
          );
        })}
    </div>
  );
}
