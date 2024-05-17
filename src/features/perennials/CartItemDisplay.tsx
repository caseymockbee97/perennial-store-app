import { useAppDispatch } from "../../app/hooks"
import type { CartItem } from "./perennialsSlice"
import { decrementItem, incrementItem, removeFromCart } from "./perennialsSlice"

interface Props {
  cartItem: CartItem
}

export const CartItemDisplay = ({ cartItem }: Props) => {
  const dispatch = useAppDispatch()

  const { count, item } = cartItem
  const { value, d, p, u } = item

  return (
    <div>
      <a
        href={`https://www.perennials-plus.com/${u}`}
        target="_blank"
        rel="noreferrer"
      >
        <h2>
          {value} - ${p}
        </h2>
      </a>
      {/* Using dangerouslySetInnerHTML to correctly parse the text */}
      <span dangerouslySetInnerHTML={{ __html: d }} />
      <button onClick={() => dispatch(decrementItem(value))}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(incrementItem(value))}>+</button>
      <span>Price: ${count * p}</span>
      <button onClick={() => dispatch(removeFromCart(value))}>Remove</button>
    </div>
  )
}
