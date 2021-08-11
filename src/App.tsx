import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import movieService from './services/movies';
import { Layout, Row, Col, Card, Typography } from 'antd';
const { Text } = Typography;
const { Content } = Layout;
const { Meta } = Card;

const App = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    console.log('ran service');
    movieService.getAll().then((movies: any) => {
      setMovies(movies);
      console.log('movie list,', movies);
    });
  }, []);

  return (
    <Content>
      <Row align="middle" justify="center">
        <Col xs={24} sm={16}>
          <Row align="middle" justify="center">
            {movies.map((movie: any) => {
              return (
                <Card hoverable style={{ width: 240 }} cover={<img alt="movie poster" src={movie.poster} />}>
                  <Meta title={`${movie.title} (${movie.year})`} description={movie.plot} />
                  <Text strong>Director: {movie.director}</Text>
                </Card>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Content>
  );
};

export default App;
