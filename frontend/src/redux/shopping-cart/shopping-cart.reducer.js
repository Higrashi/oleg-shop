const INITIAL_STATE = {
    shoppingCart: []
}


const shoppingCartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "ADD_ITEM_TO_CART":
            const newItem = action.payload;
            console.log('This is item from reducer', newItem)
            const itemExists = state.shoppingCart.find(item => item.id === newItem.id);
            if(itemExists) {
              const newCartItems = state.shoppingCart.map(item => {
                  if(item.id === newItem.id){
                      item.qty = item.qty + newItem.qty
                  }

                  return item
              })

              return {
                  ...state,
                  shoppingCart: [...newCartItems]
              }

            } else {
                return {
                    ...state,
                    shoppingCart: [...state.shoppingCart, action.payload]
                }
            }
         case "UPDATE_QTY":
             const updateItem = action.payload;
             let ifItemExists = state.shoppingCart.find(item => item.id === updateItem.id);
             if(ifItemExists) {
                 const newState = state.shoppingCart.map(item => {
                     if(item.id === updateItem.id) {
                         item.qty = updateItem.qty
                     }
                     return item
                 })
                 return {
                     ...state,
                     shoppingCart: [...newState]
                 }
             }   
         case "DELETE_ITEM": 
            const newCart = state.shoppingCart.filter(item => item.id != action.payload);
            
            return{
                ...state,
                shoppingCart: [...newCart]
            }
         case "CLEAR_CART": 
            return {
                ...state,
                shoppingCart: []
            }   
           
        default:
            return state    
    }
}

export default shoppingCartReducer;