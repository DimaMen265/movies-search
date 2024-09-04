import { getSearchMovies, DEF_PATH_IMAGE, DEF_LOGO_SIZE } from "components/api";
import { useState, useEffect } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import styles from "./Movies.module.css";

let schema = object({
    searchString: string().required(),
});

const Movies = () => {
    const [movies, setMovies] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const handleSubmit = values => {
        onSubmit(values.searchString.trim());
    };

    const onSubmit = searchString => {
        const searchParams = searchString !== "" ? { search: searchString } : {};
        setSearchParams(searchParams);
    };

    useEffect(() => {
        const abortController = new AbortController();
        const searchString = searchParams.get("search");

        if (!searchString) {
            setMovies(null);
            return;
        };

        const searchList = async (searchString, abortController) => {
            try {
                const list = await getSearchMovies(searchString, abortController);
                setMovies(list.data.results);
            } catch (error) {
                if (error.message !== "canceled") {
                    toast.error(error.message);
                };
            };
        };

        searchList(searchString, abortController);

        return () => {
            abortController.abort();
        };
    }, [searchParams]);

    return (
        <main>
            <Formik initialValues={{ searchString: "" }} onSubmit={handleSubmit} validationSchema={schema}>
                <Form className={styles.searchForm}>
                    <Field type="text" name="searchString" placeholder="Search movies" className={styles.searchInput} />
                    <button type="submit" className={styles.searchButton}>Search</button>
                </Form>
            </Formik>
            
            <ul className={styles.searchList}>
                {
                    movies &&
                    movies.map(item => (
                        <li key={item.id} className={styles.searchItem}>
                            <Link to={`/movies/${item.id}`} state={{ from: location }}>
                                <img src={`${DEF_PATH_IMAGE}${DEF_LOGO_SIZE}${item.poster_path}`} alt={item.title} />
                                <p className={styles.searchText}>{item.title}</p>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </main>
    );
};

export default Movies;
