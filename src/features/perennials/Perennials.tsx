import { Items } from "./Items"

import { useState } from "react"
import { selectCart } from "./perennialsSlice"
import { useAppSelector } from "../../app/hooks"
import { CartList } from "./CartList"

export const Perennials = () => {
  const [cartIsOpen, setCartIsOpen] = useState(false)
  const cart = useAppSelector(selectCart)

  const cartTotal = Object.values(cart).reduce((acc, cur) => {
    const itemTotal = cur.item.p * cur.count

    return acc + itemTotal
  }, 0)

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold inline">Perennials Estimator</h1>

        <button
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md text-md"
          onClick={() => setCartIsOpen(prev => !prev)}
        >
          {cartIsOpen ? "Hide" : "Show"} Cart - ${cartTotal}
        </button>
      </div>

      {cartIsOpen && <CartList />}

      <Items />
    </div>
  )
}
