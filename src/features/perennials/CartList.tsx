import { useAppSelector } from "../../app/hooks"
import { CartItemDisplay } from "./CartItemDisplay"
import { selectCart } from "./perennialsSlice"

export const CartList = () => {
  const cart = useAppSelector(selectCart)

  const cartItems = Object.values(cart)

  return (
    <div className="border-2 rounded-md p-4 my-2">
      {cartItems.length ? (
        <ul className="divide-y divide-gray-100 my-2 border-gray-100">
          {cartItems.map(cartItem => (
            <CartItemDisplay
              cartItem={cartItem}
              key={cartItem.item.value + cartItem.item.d + cartItem.item.p}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center">Cart is empty!</p>
      )}
    </div>
  )
}
