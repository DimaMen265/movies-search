import { getMovieReviews } from "components/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Reviews.module.css";

const Reviews = () => {
    const [reviews, setReviews] = useState();
    const { movieId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();

        const getReviews = async (id, abortController) => {
            try {
                const result = await getMovieReviews(id, abortController);
                setReviews(result.data.results);
            } catch (error) {
                if (error.message !== "canceled") {
                    toast.error(error.message);
                };
            };
        };

        getReviews(movieId, abortController);

        return () => {
            abortController.abort();
        };
    }, [movieId]);

    return (
        <div>
            {
                reviews && reviews.length ? (
                    <ul className={styles.reviewList}>
                        {
                            reviews.map(item => (
                                <li key={item.id} className={styles.reviewItem}>
                                    <p className={styles.reviewInfo}>{item.author}</p>
                                    <p className={styles.reviewInfo}>{item.content}</p>
                                </li>
                            ))
                        }
                    </ul>
                ) : (
                    <p className={styles.reviewNotFound}>We don`t have any reviews for this move</p>
                )
            }
        </div>
    );
};

export default Reviews;
