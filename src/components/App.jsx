import { Routes, Route } from "react-router-dom";
import { Header } from "./Header/Header";
import { Home } from "./Home/Home";
import { NotFound } from "./NotFound/NotFound";

import { lazy } from "react";

const Movies = lazy(() => import("./Movies/Movies"));
const MoviesDetails = lazy(() => import("./MoviesDetails/MoviesDetails"));
const Cast = lazy(() => import("./Cast/Cast"));
const Reviews = lazy(() => import("./Reviews/Reviews"));

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Header />}>
                <Route index element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movies/:movieId" element={<MoviesDetails />}>
                    <Route path="cast" element={<Cast />} />
                    <Route path="reviews" element={<Reviews />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
