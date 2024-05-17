import { useAppDispatch } from "../../app/hooks"
import { addToCart, type Item } from "./perennialsSlice"

interface Props {
  item: Item
}

export const ItemDisplay = ({ item }: Props) => {
  const dispatch = useAppDispatch()

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
          {value} - ${p}
        </a>
        {/* Using dangerouslySetInnerHTML to correctly parse the text */}
        <p className="text-l" dangerouslySetInnerHTML={{ __html: d }} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-right">${p}</h2>
        <button
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md text-md"
          onClick={() => dispatch(addToCart(item))}
        >
          Add to cart
        </button>
      </div>
    </li>
  )
}
