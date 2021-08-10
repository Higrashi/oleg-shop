export const addNewItem = (item, qty) => ({
    type: 'ADD_ITEM_TO_CART',
    payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        main_image: item.main_image,
        description: item.description,
        qty: qty

    }
})

export const updateQty = (item,qty) => ({
    type: 'UPDATE_QTY',
    payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description,
        qty: qty
    }
})

export const deleteItem = (id) => ({
    type: 'DELETE_ITEM',
    payload: id
})

export const clearCart = () => ({
    type: 'CLEAR_CART'
})