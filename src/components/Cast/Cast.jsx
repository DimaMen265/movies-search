import { getMovieCredits, DEF_PATH_IMAGE, DEF_LOGO_SIZE } from "components/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Cast.module.css";

const Cast = () => {
    const [cast, setCast] = useState();
    const { movieId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();

        const getCast = async (id, abortController) => {
            try {
                const result = await getMovieCredits(id, abortController);
                setCast(result.data.cast);
            } catch (error) {
                if (error.message !== "canceled") {
                    toast.error(error.message);
                };
            };
        };

        getCast(movieId, abortController);

        return () => {
            abortController.abort();
        };
    }, [movieId]);

    return (
        <div>
            {
                cast &&
                (
                    <ul className={styles.castList}>
                        {
                            cast.map(item => (
                                <li key={item.id} className={styles.castItem}>
                                    {
                                        item.profile_path &&
                                        (
                                            <img src={`${DEF_PATH_IMAGE}${DEF_LOGO_SIZE}${item.profile_path}`} alt={item.title} />
                                        )
                                    }

                                    <div className={styles.infoContainer}>
                                        <p className={styles.castInfo}>{item.name}</p>
                                        <p className={styles.castInfo}>Character: {item.character}</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    );
};

export default Cast;
