const cid = "65ff33826a6a680e86458716"

const addCart = document.getElementById("addCart")
const _id = addCart.name

addCart.addEventListener("click", () => {
  fetch(`/api/carts/${cid}/product/${_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        Swal.fire({
          title: "Good job!",
          text: `${data.message}`,
          icon: "success"
        })
      } else if (data.status === "error") {
        Swal.fire({
          title: "Oops...",
          text: `${data.message}`,
          icon: "error"
        })
      }
    })
    .catch((e) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${e.error}`
      })
    })
})