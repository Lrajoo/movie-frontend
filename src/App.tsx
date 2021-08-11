import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import movieService from './services/movies';
import { Layout, Row, Col, Card, Button, Typography } from 'antd';
const { Content } = Layout;
const { Text } = Typography;
const { Meta } = Card;

const App = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [currMovie, setCurrMovie] = useState(0);
  const [likedMovies, setLikedMovies] = useState<any[]>([]);
  useEffect(() => {
    movieService.getAll().then((movies: any) => {
      setMovies(movies);
    });
  }, []);

  const nextMovie = () => {
    setCurrMovie(currMovie + 1);
  };

  const likeMovie = (movie: any) => {
    setLikedMovies([...likedMovies, movie]);
    nextMovie();
  };

  const resetSelection = () => {
    setCurrMovie(0);
    setLikedMovies([]);
  };

  return (
    <Content>
      <Row align="middle" justify="center">
        <Col xs={24} sm={16}>
          {movies.length > 0 && currMovie < movies.length && (
            <Card title="Tinder for Movies">
              <Row align="middle" justify="center">
                <Col xs={12}>
                  <Row align="middle" justify="center">
                    <Button onClick={() => nextMovie()}>No</Button>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row align="middle" justify="center">
                    <Button type="primary" onClick={() => likeMovie(movies[currMovie])}>
                      Yes
                    </Button>
                  </Row>
                </Col>
              </Row>
              <Row align="middle" justify="start">
                <Col xs={12}>
                  <Row align="middle" justify="start">
                    <Col xs={24}>{movies[currMovie].title}</Col>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row align="middle" justify="end">
                    {movies[currMovie].year}
                  </Row>
                </Col>
              </Row>
              <Row align="middle" justify="start">
                <Col xs={18}>
                  <Row align="middle" justify="start">
                    Director: {movies[currMovie].director}
                  </Row>
                </Col>
                <Col xs={6}>
                  <Row align="middle" justify="end">
                    {movies[currMovie].runtime} min
                  </Row>
                </Col>
              </Row>

              <Row align="middle" justify="center">
                <Col xs={24}>
                  <Row align="middle" justify="center">
                    <img src={movies[currMovie].poster} alt="Movie Poster" />
                  </Row>
                </Col>
              </Row>
              <Row align="middle" justify="center">
                {movies[currMovie].ratings.map((rating: any) => {
                  return (
                    <Col xs={8} key={rating.Source}>
                      <Row align="middle" justify="center" style={{ textAlign: 'center' }}>
                        {rating.Source}
                      </Row>
                      <Row align="middle" justify="center">
                        {rating.Value}
                      </Row>
                    </Col>
                  );
                })}
              </Row>
              <Row>
                <Col xs={24}>
                  <Row align="middle" justify="center">
                    {movies[currMovie].plot}
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={24}>Cast: {movies[currMovie].cast.join(', ')}</Col>
              </Row>
              <Row>
                <Col xs={24}>Genre: {movies[currMovie].genre.join(', ')}</Col>
              </Row>
            </Card>
          )}
          {currMovie === movies.length && (
            <Row align="middle" justify="center">
              <h3 style={{ textAlign: 'center' }}>Liked Movies</h3>
              {likedMovies.map((movie: any) => (
                <Col xs={24} key={movie.title}>
                  <Row align="middle" justify="center">
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      key={movie._id}
                      cover={<img alt="movie poster" src={movie.poster} />}
                    >
                      <Meta title={`${movie.title} (${movie.year})`} description={movie.plot} />
                      <Text strong>Director: {movie.director}</Text>
                    </Card>
                  </Row>
                </Col>
              ))}
              <Button type="primary" onClick={() => resetSelection()}>
                Reset
              </Button>
            </Row>
          )}
        </Col>
      </Row>
    </Content>
  );
};

export default App;
