import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import Items from "../../app/items.json"

export interface Item {
  value: string // Title
  c: string[] // unknown
  d: string // Description - HTML
  p: number // Price
  i: string // unknown
  u: string // link
}

export interface CartItem {
  count: number
  item: Item
}

export interface PerennialsSliceState {
  cart: Record<Item["value"], CartItem>
  items: Item[]
}

const initialState: PerennialsSliceState = {
  cart: {},
  items: Items.items,
}

export const perennialsSlice = createSlice({
  name: "perennials",
  initialState,
  reducers: create => ({
    addToCart: create.reducer((state, action: PayloadAction<Item>) => {
      const cartItem = state.cart[action.payload.value]

      if (!cartItem) {
        state.cart[action.payload.value] = { count: 1, item: action.payload }
      } else {
        cartItem.count += 1
      }
    }),
    removeFromCart: create.reducer((state, action: PayloadAction<string>) => {
      if (state.cart[action.payload]) {
        delete state.cart[action.payload]
      }
    }),
    incrementItem: create.reducer((state, action: PayloadAction<string>) => {
      if (state.cart[action.payload]) {
        state.cart[action.payload].count += 1
      }
    }),
    decrementItem: create.reducer((state, action: PayloadAction<string>) => {
      if (state.cart[action.payload] && state.cart[action.payload].count > 0) {
        state.cart[action.payload].count -= 1
      }
    }),
  }),
  selectors: {
    selectCart: perennial => perennial.cart,
    selectItems: perennial => perennial.items,
  },
})

export const { addToCart, removeFromCart, incrementItem, decrementItem } =
  perennialsSlice.actions

export const { selectItems, selectCart } = perennialsSlice.selectors
