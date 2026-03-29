import ReviewsComponent from '@/components/Dashboard/ReviewsComponent/ReviewsComponent';
import { getReviews } from '@/action/review';

const ReviewsPage = async () => {
    const data = await getReviews();
    const reviews = data?.map((review) => ({
        ...review,
        _id: review._id.toString(),
    }));
    return <ReviewsComponent reviews={reviews} />;
}

export default ReviewsPage;
