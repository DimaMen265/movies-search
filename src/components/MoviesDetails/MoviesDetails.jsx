import { getMovieDetails, DEF_PATH_IMAGE, DEF_POSTER_SIZE } from "components/api";
import { useState, useEffect, useRef, Suspense } from "react";
import { useParams, useLocation, Link, NavLink, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import styles from "./MoviesDetails.module.css";

const BackLink = styled(Link)`
  color: orange;
  background-color: white;
  border: 1px solid orange;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 120px;
  margin-bottom: 16px;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    border 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: white;
    background-color: orange;
    border: none;
  }
`;

const PageLink = styled(NavLink)`
  color: black;
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1), font-weight 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &.active {
    color: orange;
    font-weight: 500;
  }

  &:hover {
    color: orange;
    font-weight: 500;
  }
`;

const MoviesDetails = () => {
    const { movieId } = useParams();
    const [details, setDetails] = useState(null);
    const location = useLocation();
    const backLink = useRef(location.state?.from ?? "/");

    useEffect(() => {
        const abortController = new AbortController();

        const getDetails = async (id, abortController) => {
            try {
                const result = await getMovieDetails(id, abortController);
                setDetails(result.data)
            } catch (error) {
                if (error.message !== "canceled") {
                    toast.error(error.message);
                };
            };
        };

        getDetails(movieId, abortController);

        return () => {
            abortController.abort();
        };
    }, [movieId]);

    return (
        <main>
            {
                details &&
                (
                    <div>
                        <BackLink to={backLink.current}>Go back</BackLink>

                        <div className={styles.moviesDetailsContainer}>
                            <div className={styles.posterContainer}>
                                <img src={`${DEF_PATH_IMAGE}${DEF_POSTER_SIZE}${details.poster_path}`} alt={details.title} />
                            </div>

                            <div className={styles.contentContainer}>
                                <div className={styles.sectionContainer}>
                                    <h1>
                                        {details.title} ({details.release_date.split("-")[0]})
                                    </h1>
                                    <p>User score: {Math.round(details.vote_average * 10)}%</p>
                                </div>

                                <div className={styles.sectionContainer}>
                                    <h2>Overview</h2>
                                    <p>{details.overview}</p>
                                </div>

                                <div className={styles.sectionContainer}>
                                    <h2>Genres</h2>
                                    <p>{details.genres.map(genre => genre.name).join(" ")}</p>
                                </div>
                            </div>
                        </div>

                        <ul className={styles.pageList}>
                            <li>
                                <PageLink to="cast">Cast</PageLink>
                            </li>
                            <li>
                                <PageLink to="reviews">Reviews</PageLink>
                            </li>
                        </ul>

                        <Suspense fallback={<div>Loading...</div>}>
                            <Outlet />
                        </Suspense>
                    </div>
                )
            }
        </main>
    );
};

export default MoviesDetails;
