import { getTrending, DEF_PATH_IMAGE, DEF_LOGO_SIZE } from "components/api";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Home.module.css";

export const Home = () => {
    const location = useLocation();
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        const getMovies = async abortController => {
            try {
                const result = await getTrending(abortController);
                setTrending(result.data.results);
            } catch (error) {
                if (error.message !== "canceled") {
                    toast.error(error.message);
                };
            };
        };

        getMovies(abortController);

        return () => {
            abortController.abort();
        };
    }, [])

    return (
        <main>
            <h1 className={styles.titleTrending}>Trending today</h1>

            <ul className={styles.listTrending}>
                {
                    trending &&
                    trending.map(item => (
                        <li key={item.id} className={styles.itemTrending}>
                            <Link to={`/movies/${item.id}`} state={{ from: location }}>
                                <img src={`${DEF_PATH_IMAGE}${DEF_LOGO_SIZE}${item.poster_path}`} alt={item.title} />
                                <p className={styles.textTrending}>{item.title}</p>
                            </Link>  
                        </li>
                    ))
                }
            </ul>
        </main>
    );
};
