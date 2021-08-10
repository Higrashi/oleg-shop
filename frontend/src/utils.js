export const countCartItems = (cart) => {
   return cart.reduce((acc, item) => acc + Number(item.qty),0);
}

export const countTotalPrice = (cart) => {
   const totalPrice = cart.reduce(function(acc, item)  {
      return acc + (Number(item.price) * Number(item.qty))
      },0)
   return totalPrice
}

export const generateCurrentDate = () => {
   let today = new Date();
   let dd = String(today.getDate()).padStart(2, '0');
   let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
   let yyyy = today.getFullYear();
   today = dd + '/' + mm + '/' + yyyy;
   return today
}