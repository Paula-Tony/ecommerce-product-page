const menuBtn = document.querySelector(".menu");
const navCloseBtn = document.querySelector(".nav .close");
const nav = document.querySelector(".nav");
const cart = document.querySelector(".cart");
const cartCard = document.querySelector(".cart-card");
const mainImg = document.querySelector(".main-img img");
const thumbs = document.querySelectorAll(".thumbnail-imgs .thumb");
const nextImgBtn = document.querySelector(".next");
const previousImgBtn = document.querySelector(".previous");
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");
const amount = document.querySelector(".amount");
const cartNum = document.querySelector(".cart .num");
const addCartBtn = document.querySelector(".options .btn");
const productCardContainer = document.querySelector(
  ".cart-card .product-container"
);

menuBtn.onclick = function () {
  nav.classList.add("open");
  navCloseBtn.classList.remove("d-none");
};

navCloseBtn.onclick = function () {
  nav.classList.remove("open");
  navCloseBtn.classList.add("d-none");
};

cart.onclick = function () {
  cartCard.classList.toggle("d-none");
};

if (window.innerWidth > 768) {
  mainImg.addEventListener("click", function () {
    let overlay = document.createElement("overlay");
    overlay.className = "overlay";
    let popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
    <div class="main-img mb-4 position-relative">
      <div
        class="previous d-flex align-items-center justify-content-center position-absolute rounded-circle bg-white"
      >
        <svg
          class="me-1"
          width="12"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 1 3 9l8 8"
            stroke-width="3"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </div>
      <img class="img-fluid" src="${mainImg.src}" alt="sneaker" />
      <div
        class="next d-flex align-items-center justify-content-center position-absolute rounded-circle bg-white"
      >
        <svg
          class="ms-1"
          width="13"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m2 1 8 8-8 8"
            stroke-width="3"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <svg
      class="close-popup"
      width="14"
      height="15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
        fill-rule="evenodd"
      />
    </svg>`;
    let thumbnailImg = document
      .querySelector(".main .thumbnail-imgs")
      .cloneNode(true);
    popup.appendChild(thumbnailImg);
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
  });
}

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", function (event) {
    thumbs.forEach((thumb) => {
      thumb.classList.remove("active");
    });
    event.target.classList.add("active");
    mainImg.src = `images/image-product-${event.target.dataset.img}.jpg`;
  });
});

function nextImg() {
  let currentImg;
  thumbs.forEach((thumb) => {
    if (thumb.classList.contains("active")) {
      currentImg = thumb.dataset.img;
      thumb.classList.remove("active");
    }
  });
  currentImg == 4 ? (currentImg = 1) : currentImg++;
  thumbs.forEach((thumb) => {
    if (thumb.dataset.img == currentImg) {
      thumb.click();
    }
  });
  mainImg.src = `images/image-product-${currentImg}.jpg`;
}

function previousImg() {
  let currentImg;
  thumbs.forEach((thumb) => {
    if (thumb.classList.contains("active")) {
      currentImg = thumb.dataset.img;
      thumb.classList.remove("active");
    }
  });
  currentImg == 1 ? (currentImg = 4) : currentImg--;
  thumbs.forEach((thumb) => {
    if (thumb.dataset.img == currentImg) {
      thumb.click();
    }
  });
  mainImg.src = `images/image-product-${currentImg}.jpg`;
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("close-popup")) {
    document.querySelector(".overlay").remove();
    document.querySelector(".popup").remove();
  }
  if (event.target.classList.contains("previous")) {
    previousImg();
    if (document.querySelector(".popup .main-img img")) {
      document.querySelector(".popup .main-img img").src = mainImg.src;
    }
    if (document.querySelector(".popup .thumbnail-imgs")) {
      document.querySelector(".popup .thumbnail-imgs").innerHTML = document
        .querySelector(".main .thumbnail-imgs")
        .cloneNode(true).innerHTML;
    }
  }
  if (event.target.classList.contains("next")) {
    nextImg();
    if (document.querySelector(".popup .main-img img")) {
      document.querySelector(".popup .main-img img").src = mainImg.src;
    }
    if (document.querySelector(".popup .thumbnail-imgs")) {
      document.querySelector(".popup .thumbnail-imgs").innerHTML = document
        .querySelector(".main .thumbnail-imgs")
        .cloneNode(true).innerHTML;
    }
  }
  if (event.target.classList.contains("thumb")) {
    let thumbs = document.querySelectorAll(".popup .thumb");
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", function (event) {
        thumbs.forEach((thumb) => {
          thumb.classList.remove("active");
        });
        event.target.classList.add("active");
        mainImg.src = `images/image-product-${event.target.dataset.img}.jpg`;
      });
    });
    if (document.querySelector(".popup .main-img img")) {
      document.querySelector(".popup .main-img img").src = mainImg.src;
    }
  }
  if (event.target.classList.contains("delete-product")) {
    productCardContainer.innerHTML = `<p class="empty-msg text-center">Your cart is empty</p>`;
    cartNum.innerHTML = "";
  }
});

plusBtn.addEventListener("click", function () {
  amount.innerHTML++;
});

minusBtn.addEventListener("click", function () {
  if (amount.innerHTML == 0) {
    minusBtn.disabled = true;
  } else {
    amount.innerHTML--;
  }
});

addCartBtn.addEventListener("click", function () {
  if (amount.innerHTML > 0) {
    productCardContainer.innerHTML = `
      <div class="product d-flex align-items-center">
        <img
          class="thumb rounded"
          src="${mainImg.src}"
          alt=""
        />
        <div class="content">
          <p class="product-name">${
            document.querySelector(".product-details h1").innerHTML
          }</p>
          <div class="price">
            ${document.querySelector(".price .current-price").innerHTML} x ${
      amount.innerHTML
    }
            <span class="total fw-bold text-black">$${
              +document
                .querySelector(".price .current-price")
                .innerHTML.slice(1) * +amount.innerHTML
            }.00</span>
          </div>
        </div>
        <img class="delete-product" src="images/icon-delete.svg" />
      </div>
      <button class="btn text-white mt-3 w-100" type="submit">
        Checkout
      </button>
    `;
    cartNum.innerHTML = amount.innerHTML;
  } else {
    productCardContainer.innerHTML = `<p class="empty-msg text-center">Your cart is empty</p>`;
    cartNum.innerHTML = "";
  }
});
