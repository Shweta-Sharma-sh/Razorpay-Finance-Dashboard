// const container = document.getElementById("container");
// const cart = document.getElementById("cart")

// // fetch('https://fakestoreapi.com/carts')
// // .then(response => response.json())
// // .then(data => console.log(data[0].products));

// fetch('https://fakestoreapi.com/products')
//   .then(response => response.json())
//   .then(data => {
//     data.forEach(product => {
//       const card = document.createElement('div');
//       card.className = "card"
//       const img = document.createElement('img');
//       img.src = product.image;
//       const title = document.createElement('h5');
//       title.innerText = product.title;
//       const price = document.createElement('p');
//       price.innerText = product.price;
//       const btn = document.createElement('button');
//       btn.innerText = "Add to Cart";
//       btn.addEventListener('click', ()=>{
//         const prod = document.createElement('p');
//         prod.innerText = product.title;
//         cart.appendChild(prod)
          
//       });
//       card.appendChild(img);
//       card.appendChild(title);
//       card.appendChild(price);
//       card.appendChild(btn);
//       container.appendChild(card);
//     });
//   });
  



// btn.innerText = "Add to Cart";
//       btn.addEventListener('click', ()=>{
//         const prod = document.createElement('div');
//         const p = document.createElement('p');
//         p.innerText = product.title;
//         const del = document.createElement('button');
//         del.innerText = 'Delete'
//         del.addEventListener('click' , () => {
//           cart.removeChild(prod)
//         })
//         prod.appendChild(p)
//         prod.appendChild(del)
//         cart.appendChild(prod)
//       });




  fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {

    console.log(data);
    data.forEach(c => {
      const card = document.createElement('div');
      card.className = "card"
      const img = document.createElement('img');
      img.src = c.image;
      const title = document.createElement('h5')
      title.innerText = c.title;
      const price = document.createElement('p');
      price.innerText = c.price;
      const btn = document.createElement('button');
      btn.innerText = "Add to Cart";
      btn.addEventListener('click', ()=>{
        const prod = document.createElement('div');
        const p = document.createElement('p');
        p.innerText = c.title;
        const del = document.createElement('button');
        del.innerText = 'Delete'
        del.addEventListener('click' , () => {
          cart.removeChild(prod)
        })
        prod.appendChild(p)
        prod.appendChild(del)
        cart.appendChild(prod)
        const cartCount = document.getElementById('cart-count');
        const currentCount = parseInt(cartCount.innerText);
        cartCount.innerText = `${currentCount + 1} items`;
      }
    )
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(price);
      card.appendChild(btn);
      container.appendChild(card) 
      ;}
    );

  }
)
.catch(error => console.error('Error fetching products:', error));