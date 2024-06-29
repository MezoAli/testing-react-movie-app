import React from "react";
import { Row, Card, Col } from "react-bootstrap";
import CardMovie from "./CardMovie";
import PaginationComponent from "./Pagination";
const MoviesList = ({ movies, getPage, pageCount }) => {
  return (
    <Row className="mt-3">
      {movies.length >= 1 ? (
        movies.map((mov) => {
          return (
            <div data-testid="movieCard" key={mov.id}>
              <CardMovie mov={mov} />
            </div>
          );
        })
      ) : (
        <h2 className="text-center p-5" data-testid="noMoviesMessage">
          لا يوجد افلام...
        </h2>
      )}

      {movies.length >= 1 ? (
        <PaginationComponent getPage={getPage} pageCount={pageCount} />
      ) : null}
    </Row>
  );
};

export default MoviesList;
