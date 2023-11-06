const accessToken = "YOUR_TOKEN"

const searchForm = document.getElementById("search-form")
const showMoreButton = document.getElementById("show-more-btn")
const searchResult = document.getElementById("search-result")
const notFound = document.getElementById("not-found")

let page = 1

const searchImage = async () => {
    let keyword = document.getElementById("input-box").value
    const url = `https://api.unsplash.com/search/photos?per_page=${24}&page=${page}&query=${keyword}&client_id=${accessToken}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        const total = data.total
        const results = data.results
        console.log(data)
        console.log(total)
        if (total === 0) {
            notFound.classList.remove("invisible");
        }
        else {
            notFound.classList.add("invisible")
        }

        results.map((result) => {
            const image = document.createElement("img")
            image.classList.add("object-cover", "h-48", "w-96", "mb-4");
            image.src = result.urls.small
            const imageLink = document.createElement("a")
            imageLink.href = result.links.html
            imageLink.target = "_blank"

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink)

            console.log(total)
            if (total > 24) {
                showMoreButton.classList.remove("invisible");
            }
            else if (total === 0) {
                showMoreButton.classList.add("invisible");
            }

        })
    }
    catch (err) {
        console.log(err)
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchImage();
    searchResult.innerHTML = ""
});

showMoreButton.addEventListener("click", () => {
    page++;
    searchImage();
});