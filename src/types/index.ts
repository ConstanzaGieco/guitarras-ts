export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

/* interface Guitar{
    id: number
    name: string
    image: string
    description: string
    price: number
} */

/* https://www.typescriptlang.org/docs/handbook/utility-types.html */
/* export type CarItem = Pick<Guitar, 'id' | 'name' | 'price'| 'description'> &{
    quantity: number
} */

export type CarItem = Guitar &{
    quantity: number
}

/* export interface CarItem extends Guitar {
    quantity: number
} */

export type GuitarID = Guitar['id']