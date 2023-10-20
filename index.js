const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzc3OGY4Njg1ZWNiMzA3ODNlZTNlMmYxNzYwNTU1YyIsInN1YiI6IjY1MmY1NzBhMzU4ZGE3NWI2MWY5Y2M5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WRVCWbn6WBXhs-g38q9e9dUE-66oNserJOFkRXgmU18'
  }
};

// 콘솔 보면서 하려고 남겨둠
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));



// 카드 안에 데이터 넣기
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    const $movieCardList = document.querySelector(".cardContainer");

    // movieCard 생성 및 데이터 넣기
    data.results.forEach((movie) => {
      const $movieCard = document.createElement("div");
      $movieCard.className = "movieCard";
      $movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.overview}</p>
        <p>rating : ${movie.vote_average}</p>`;

      $movieCardList.appendChild($movieCard);

      // 카드 클릭시 alert 띄우기
      $movieCard.addEventListener('click', printID);

      function printID() {
        alert(`영화 id: ${movie.id}`);
      };
    })

  })
  .catch((err) => console.error(err));



//버튼 누르면 input value 값으로 필터링하기.
const $inputBtn = document.querySelector('#inputBtn');
const $inputText = document.getElementById('inputText');


// onsubmit 무조건 submit하게 만들어 줌.
function trueFunc(event) {
  event.preventDefault();
  return true;
}

$inputBtn.addEventListener('click', filterMovieCard);
$inputText.addEventListener('keyup', (event) => {
  let key = event.key || event.keyCode;

  if (key == 13) {
    $inputBtn.click();
  }
});

function filterMovieCard() {
  // 기존 div hide
  const movieCards = document.querySelectorAll('.movieCard');
  movieCards.forEach((movieCard) => {
    movieCard.style.display = "none";
  });

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const $movieCardList = document.querySelector(".cardContainer");

      // filtering
      const filteredVal = data.results.filter((movie) => {
        return movie.title.toLowerCase().includes($inputText.value.toLowerCase());
      })

      filteredVal.forEach((movie) => {
        const $movieCard = document.createElement("div");
        $movieCard.className = "movieCard";
        $movieCard.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>${movie.overview}</p>
          <p>rating : ${movie.vote_average}</p>`;

        $movieCardList.appendChild($movieCard);

        // 카드 클릭시 alert 띄우기
        $movieCard.addEventListener('click', printID);

        function printID() {
          alert(`영화 id: ${movie.id}`);
        };
      })
    })
    .catch((err) => console.error(err));
}


// 이미지 클릭 시 사이트로 이동
// a태그로 걸어서 네이버 도메인 맨 뒤에 영화이름 넣으면 될듯?
// 로그인 기능 구현
// 나만의 즐겨찾기 구현
// 좋아요 누른 카드 상위에 띄워지도록 구현