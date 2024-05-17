import { useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectCart, selectItems } from "./perennialsSlice"
import { ItemDisplay } from "./ItemDisplay"
import { CartItemDisplay } from "./CartItemDisplay"

export const Perennials = () => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(selectCart)
  const items = useAppSelector(selectItems)
  const [search, setSearch] = useState("")

  const filteredItems = useMemo(() => {
    return items
      .filter(({ value, d, p }) => {
        if (!p) {
          return false
        }

        const normalizedSearch = search.toLocaleLowerCase()

        return (
          value.toLocaleLowerCase().includes(normalizedSearch) ||
          d.toLocaleLowerCase().includes(normalizedSearch)
        )
      })
      .sort((a, b) => a.p - b.p)
  }, [items, search])

  const cartItems = Object.values(cart)

  const cartTotal = Object.values(cart).reduce((acc, cur) => {
    const itemTotal = cur.item.p * cur.count

    return acc + itemTotal
  }, 0)

  return (
    <div>
      <h2>Cart - ${cartTotal}</h2>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItemDisplay
            cartItem={cartItem}
            key={cartItem.item.value + cartItem.item.d + cartItem.item.p}
          />
        ))
      ) : (
        <p>Cart is empty</p>
      )}
      <label htmlFor="search">Search</label>
      <input
        type="text"
        onChange={e => setSearch(e.target.value)}
        value={search}
        id="search"
      />
      {filteredItems.length ? (
        filteredItems.map(item => (
          <ItemDisplay item={item} key={item.value + item.d + item.p} />
        ))
      ) : (
        <p>Nothing matches that search</p>
      )}
    </div>
  )
}
