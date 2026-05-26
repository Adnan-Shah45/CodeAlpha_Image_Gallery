const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".close-btn");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let currentIndex = 0;

// 1. Filtering Logic with Smooth CSS Classes
filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");

        galleryItems.forEach(item => {
            const category = item.getAttribute("data-category");

            if(filterValue === "all" || filterValue === category){
                item.classList.remove("hide");
            } else {
                item.classList.add("hide");
            }
        });
    });
});

// 2. Lightbox Open Handler
galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentIndex = index;
        showImage();
        lightbox.style.display = "flex";
    });
});

// 3. Show Image core logic (Handles captions smoothly)
function showImage(){
    const currentItem = galleryItems[currentIndex];
    const img = currentItem.querySelector("img");
    const caption = currentItem.querySelector("span");

    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption.textContent;
}

// 4. Next Button (Skips hidden images seamlessly)
nextBtn.addEventListener("click", () => {
    do {
        currentIndex++;
        if(currentIndex >= galleryItems.length){
            currentIndex = 0;
        }
    } while (galleryItems[currentIndex].classList.contains("hide")); // Skip if item is hidden by filter

    showImage();
});

// 5. Prev Button (Skips hidden images seamlessly)
prevBtn.addEventListener("click", () => {
    do {
        currentIndex--;
        if(currentIndex < 0){
            currentIndex = galleryItems.length - 1;
        }
    } while (galleryItems[currentIndex].classList.contains("hide")); // Skip if item is hidden by filter

    showImage();
});

// 6. Close Event Handlers
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
    if(e.target === lightbox){
        lightbox.style.display = "none";
    }
});

// 7. Keyboard Navigation Controls
document.addEventListener("keydown", (e) => {
    if(lightbox.style.display === "flex"){
        if(e.key === "ArrowRight") nextBtn.click();
        if(e.key === "ArrowLeft") prevBtn.click();
        if(e.key === "Escape") lightbox.style.display = "none";
    }
});

// 8. Image Preloading Optimization
window.addEventListener("load", () => {
    galleryItems.forEach(item => {
        const img = item.querySelector("img");
        const preload = new Image();
        preload.src = img.src;
    });
});