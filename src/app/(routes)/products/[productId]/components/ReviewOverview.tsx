import { ReviewCount } from "@/types/Product";
import Stars from "./Stars";

interface ReviewOverviewProps {
  reviewCount: ReviewCount;
}

const ReviewOverview = ({ reviewCount }: ReviewOverviewProps) => {
  const { sumScore, ...rest } = reviewCount as ReviewCount;
  const safeSumScore = sumScore ?? 0;

  const ratings = [
    rest.rate5Length ?? 0,
    rest.rate4Length ?? 0,
    rest.rate3Length ?? 0,
    rest.rate2Length ?? 0,
    rest.rate1Length ?? 0,
  ];





  const maxRating = Math.max(...ratings, 1)

  
  return (
    <div className="border-gray03 flex h-68.75 items-center justify-between rounded-xl border px-61">
      <div className="flex flex-col items-center gap-6 leading-none">
        <p className="text-gray03 text-[2.375rem] leading-none font-extrabold">
          <span className="text-black01 text-[4rem]">{safeSumScore.toFixed(1)}</span> / 5
        </p>
        <Stars
          rating={safeSumScore}
          size="large"
        />
      </div>
      <div className="flex flex-col gap-5">
        {ratings.map((rating, index) => (
          <div
            className="flex gap-7.5 text-xl leading-none font-bold"
            key={index}
          >
            <p className="font-extrabold">{5 - index}점</p>
            <div className="bg-gray04 h-2.5 w-92.5 rounded-xl">
              <div
                className="bg-yellow01 h-2.5 rounded-xl"
                style={{ width: `${(rating / maxRating) * 23.125}rem` }}
              />
            </div>
            <p>{rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ReviewOverview;
