const socket = io()

socket.on("products", (data) => {
  renderProducts(data)
})

const formNewProduct = document.getElementById("formNewProduct")
// const formDeleteProduct = document.getElementById("formDeleteProduct")

const role = document.getElementById("role").textContent
const email = document.getElementById("email").textContent

formNewProduct.addEventListener("submit", (e) => {
  e.preventDefault()

  const owner = role === "premium" ? email : "admin"

  let title = document.getElementById("title").value
  let description = document.getElementById("description").value
  let price = parseInt(document.getElementById("price").value)
  let thumbnail = document.getElementById("thumbnail").value
  let code = document.getElementById("code").value
  let stock = document.getElementById("stock").value
  let category = document.getElementById("category").value

  const newProduct = {
    code,
    title,
    description,
    price,
    thumbnail,
    stock,
    category,
    owner
  }

  socket.emit("newProduct", newProduct)

  formNewProduct.reset()

})

// formDeleteProduct.addEventListener("submit", (e) => {
//   e.preventDefault()
//   let id = document.getElementById("id").value
//   socket.emit("deleteProduct", id)
//   formDeleteProduct.reset()
// })

const renderProducts = (products) => {
  
  const realTimeProducts = document.getElementById("realTimeProducts")
  realTimeProducts.innerHTML = ""
  products.forEach(prod => {
    let card = document.createElement("div")

    card.className = "card"

    const images = prod.thumbnail && prod.thumbnail.length > 0
      ? prod.thumbnail.map(imgSrc => `<img src="${imgSrc}" alt="${prod.title}">`).join("")
      : `<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.fVw9JodzxGszcW51PEDnoAAAAA%26pid%3DApi&f=1&ipt=728f1607c998e79909475d842d8f820e0fccfb7473a337951a49e845a158e7bf&ipo=images" alt="No Image">`

    card.innerHTML = `
      <div class="images" >
        ${images}
      </div>
      <h3>${prod.title}</h3>
      <p>Category: ${prod.category} </p>
      <p>Price: $${prod.price}</p>
      <p>Description: ${prod.description} </p>
      <button>Delete</button>
    `
    card.querySelector("button").addEventListener("click", () => {

      if (role === "premium" && prod.owner === email) {
        socket.emit("deleteProduct", `${prod._id}`)
      } else if (role === "admin") {
        socket.emit("deleteProduct", `${prod._id}`)
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You do not have permission to delete that product.",
        })
      }
    })

    realTimeProducts.appendChild(card)
  })
}

socket.on("error", (data) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${data}`
  })
})

socket.on("success", (data) => {
  Swal.fire({
    title: "Good job!",
    text: `${data.message}`,
    icon: "success"
  })
})