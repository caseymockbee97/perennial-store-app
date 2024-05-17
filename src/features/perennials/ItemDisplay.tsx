import { useAppDispatch } from "../../app/hooks"
import { addToCart, type Item } from "./perennialsSlice"

interface Props {
  item: Item
}

export const ItemDisplay = ({ item }: Props) => {
  const dispatch = useAppDispatch()

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

      <button onClick={() => dispatch(addToCart(item))}>Add to cart</button>
    </div>
  )
}
