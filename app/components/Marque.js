import { cn } from "@/lib/utils";
import Marquee from "../../components/ui/marquee.jsx";

const reviews = [
  { img: "https://pixner.net/aikeu/assets/images/banner/large-slider/one.png" },
  { img: "https://pixner.net/aikeu/assets/images/banner/large-slider/two.png" },
  { img: "https://pixner.net/aikeu/assets/images/banner/large-slider/three.png" },
  { img: "https://pixner.net/aikeu/assets/images/banner/large-slider/four.png" },
  { img: "https://pixner.net/aikeu/assets/images/banner/large-slider/five.png" },
  { img: "https://pixner.net/aikeu/assets/images/banner/large-slider/four.png" }
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2 ">
        <img className="object-cover w-56 h-24 rounded-md " alt="Review Image" src={img} />
      </div>
    </figure>
  );
};

const MarqueeDemo = () => {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} img={review.img} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={index} img={review.img} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};

export default MarqueeDemo;
