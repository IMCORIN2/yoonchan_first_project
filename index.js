const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzc3OGY4Njg1ZWNiMzA3ODNlZTNlMmYxNzYwNTU1YyIsInN1YiI6IjY1MmY1NzBhMzU4ZGE3NWI2MWY5Y2M5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WRVCWbn6WBXhs-g38q9e9dUE-66oNserJOFkRXgmU18'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));