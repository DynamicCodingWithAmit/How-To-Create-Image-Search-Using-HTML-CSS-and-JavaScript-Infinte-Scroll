const searchInput = document.getElementById("searchInput")
const searchForm = document.getElementById("searchForm")
const resultImage = document.querySelector(".resultImage")
const showMoreBtn = document.querySelector(".show-more")

const accessKey = "9v0nSDV1h31kPT0N0JKlFz2HsHVlVG69G4qKAVMDYs0"
let page = 1

const fetchData = async()=>{
    const url = `https://api.unsplash.com/search/collections?page=${page}&query=${searchInput.value}&client_id=${accessKey}`
   
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const renderData = (data = []) =>{
    data.results.map(imageData =>{
        const img = document.createElement('img')
        img.src = imageData.cover_photo.urls.small

        const imgLink = document.createElement("a")
        imgLink.href = imageData.links.self

        imgLink.appendChild(img)
        resultImage.appendChild(imgLink)
   
    })
}

const handleShowMoreImage = async()=>{
    ++page
    const responeData = await fetchData()
    renderData(responeData)
}

searchForm.addEventListener('submit',async(e)=>{
    e.preventDefault()
    page = 1

   const data = await fetchData()

   resultImage.innerHTML = ""

   renderData(data)
    
   showMoreBtn.classList.remove('hidden')

   console.log("data",data)
})




showMoreBtn.addEventListener("click",async()=>{
    handleShowMoreImage()
})


window.addEventListener("scroll",()=>{
    if( (window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        handleShowMoreImage()
    }
})





