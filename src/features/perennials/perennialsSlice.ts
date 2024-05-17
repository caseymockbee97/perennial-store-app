import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import Items from "../../app/items.json"

export interface Item {
  value: string
  c: string[]
  d: string
  p: number
  i: string
  u: string
}

export interface PerennialsSliceState {
  cart: Item[]
  items: Item[]
}

const initialState: PerennialsSliceState = {
  cart: [],
  items: Items.items,
}

export const perennialsSlice = createSlice({
  name: "perennials",
  initialState,
  reducers: create => ({
    addToCart: create.reducer((state, action: PayloadAction<string>) => {
      const item = state.items.find(({ value }) => value === action.payload)
      if (item) {
        state.cart.push(item)
      }
    }),
  }),
})

export const { addToCart } = perennialsSlice.actions
