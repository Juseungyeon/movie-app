import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";


class App extends React.Component{
  // state 는 object, 변하는 data
  state = {
    isLoading: true,
    movie: []
  }
  //async+await === axios를 기다리고 다음걸 해라 (비동기)
  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };
  // state 변경하려면 setState() 사용해야함 
  componentDidMount() {
    this.getMovies();
  }

  render(){
    //es6문법이용
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
            <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              title={movie.title}
              summary={movie.summary}
              poster={movie.medium_cover_image}
              genres={movie.genres}
            />))}
          </div>
        )}
      </section>
    )
  }
}

export default App;
