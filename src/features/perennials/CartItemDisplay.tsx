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
    <li className="flex justify-between gap-x-6 py-5">
      <div>
        <a
          className="text-xl font-bold underline"
          href={`https://www.perennials-plus.com/${u}`}
          target="_blank"
          rel="noreferrer"
        >
          {value}
        </a>
        {/* Using dangerouslySetInnerHTML to correctly parse the text */}
        <p className="text-l" dangerouslySetInnerHTML={{ __html: d }} />
      </div>

      <div>
        <button
          className="mb-2 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md text-md"
          onClick={() => dispatch(removeFromCart(value))}
        >
          Remove from cart
        </button>
        <div className="flex justify-between">
          <button
            className="bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md text-sm"
            onClick={() => dispatch(decrementItem(value))}
          >
            -
          </button>
          <h2 className="text-xl font-bold text-right inline">
            {count} - ${count * p}
          </h2>
          <button
            className="bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded-md text-sm"
            onClick={() => dispatch(incrementItem(value))}
          >
            +
          </button>
        </div>
      </div>
    </li>
  )
}
