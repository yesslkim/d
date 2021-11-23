//BOARD - RENDER PAGINATION NUMBER
const renderPagination = (totalPages) => {
  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement("a");
    pageNumber.setAttribute("href", "#");
    pageNumber.setAttribute("aria-label", "페이지");
    pageNumber.classList.add("num");
    pageNumber.textContent = i;

    //current-page styling
    if (pageNumber.textContent == 1) pageNumber.classList.add("active");

    const pagination = document.querySelector(".pagination");
    pagination.insertBefore(
      pageNumber,
      pagination.lastElementChild.previousSibling
    );
  }
};

//BOARD - RENDER PAGE
const renderPage = (board, numberOfItems, numberPerPage, currentPage) => {
  const pagesWrapper = document.querySelector(".pagination");
  const pages = document.querySelectorAll(".pagination .num");
  pagesWrapper.addEventListener("click", (e) => {
    if (!e.target.classList.contains("num")) return;
    pages.forEach((page) => {
      page.classList.remove("active");

      //Set current-page
      if (page == e.target) {
        e.target.classList.add("active");
        currentPage = Number(e.target.textContent);
      }

      //re-render board lists
      document.querySelector(".board-lists").innerHTML = "";
      renderBoardLists(board, numberOfItems, numberPerPage, currentPage);
    });
  });
};

//BOARD - RENDER BOARD LISTS
const renderBoardLists = (board, numberOfItems, numberPerPage, currentPage) => {
  if (numberOfItems <= numberPerPage) return;
  const firstDataIndex = currentPage * numberPerPage - numberPerPage;
  const lastDataIndex = currentPage * numberPerPage - 1;

  for (let index = lastDataIndex; index >= firstDataIndex; index--) {
    const data = board[index];
    const template = `
    <tr>
    <td>${data.id}</td>
    <td class="title"><a href="#">${data.title}</a></td>
    <td>사용자</td>
    <td>00</td>
    </tr>
    `;
    document.querySelector(".board-lists").innerHTML += template;
  }
};

//BOARD - GET DATA
const BOARD_URL = "https://jsonplaceholder.typicode.com/posts";
fetch(BOARD_URL)
  .then((response) => response.json())
  .then((json) => {
    //15개 데이터 사용을 위해 slice 사용
    const board = json.slice(0, 15);

    const numberOfItems = board.length;
    const numberPerPage = 5;
    const totalPages = Math.ceil(numberOfItems / numberPerPage);
    const currentPage = 1;
    renderPagination(totalPages);
    renderBoardLists(board, numberOfItems, numberPerPage, currentPage);
    renderPage(board, numberOfItems, numberPerPage, currentPage);
  });

//CAROUSEL - GET DATA
const CAROUSEL_URL = "https://jsonplaceholder.typicode.com/photos";

fetch(CAROUSEL_URL)
  .then((response) => response.json())
  .then((json) => {
    const carouselArray = json.slice(0, 10);

    carouselArray.map((item) => {
      const img = document.createElement("img");
      img.setAttribute("src", item.thumbnailUrl);
      img.setAttribute("alt", item.title);

      const carouselLists = document.createElement("div");
      carouselLists.append(img);
      carouselLists.classList.add("carousel-img");

      document.querySelector(".carousel").append(carouselLists);
    });
  });

//CAROUSEL - DISABLE BTNS
let positionX = 0;

const disableBtns = (carousel, positionX) => {
  const carouselWidth = carousel.offsetWidth;

  const leftBtn = carouselBtns.querySelector(".prev");
  const rightBtn = carouselBtns.querySelector(".next");

  if (positionX === 0) {
    leftBtn.setAttribute("disabled", true);
  } else {
    leftBtn.removeAttribute("disabled");
  }

  if (positionX < -carouselWidth) {
    rightBtn.setAttribute("disabled", true);
  } else {
    rightBtn.removeAttribute("disabled");
  }
};

//CAROUSEL - UI
const carouselBtns = document.querySelector(".carousel-btns");
carouselBtns.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const carousel = document.querySelector(".carousel");
  const carouselImgWidth = Number(
    document.querySelector(".carousel-img").offsetWidth
  );

  if (e.target.classList.contains("prev")) {
    carousel.style.transform += `translate3d(${carouselImgWidth}px, 0px, 0px)`;
    positionX += carouselImgWidth;
  } else {
    carousel.style.transform += `translate3d(-${carouselImgWidth}px, 0px, 0px)`;
    positionX -= carouselImgWidth;
  }

  disableBtns(carousel, positionX);
});
