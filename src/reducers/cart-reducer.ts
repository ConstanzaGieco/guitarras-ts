import { CarItem, Guitar } from "../types"
import { db } from "../data/db"

export type CartActions =
    {type: 'add-to-cart', payload: {item: Guitar}} |
    {type: 'remove-from-cart', payload: {id: Guitar['id']}} |
    {type: 'decrease-quantity', payload: {id: Guitar['id']}} |
    {type: 'increase-quantity', payload: {id: Guitar['id']}} |
    {type: 'clear-cart'}

export type CartState = {
    data: Guitar[],
    cart: CarItem[]
}

const initialCart = () : CarItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState : CartState = {
    data: db,
    cart: initialCart()
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5

export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
    ) => {
    
    if(action.type === 'add-to-cart'){
        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)
        let updatedCart : CarItem[] = []
        if(itemExists) {
            updatedCart = state.cart.map(item => {
                if(item.id === action.payload.item.id){
                    if(item.quantity < MAX_ITEMS){
                        return {...item, quantity: item.quantity + 1}
                    } else{
                        return item
                    }
                } else{
                    return item
                }
            })
        } else {
            const newItem : CarItem = {...action.payload.item, quantity: 1}
            updatedCart = [...state.cart, newItem]
        }
        return{
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'remove-from-cart'){
        const updatedCart = state.cart.filter(item => item.id !== action.payload.id)
        return{
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'decrease-quantity'){
        const updatedCart = state.cart.map( item => {
            if(item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        return{
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'increase-quantity'){
        const updatedCart = state.cart.map( item => {
            if(item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        return{
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'clear-cart'){
        return{
            ...state,
            cart: []
        }
    }

    return state
}