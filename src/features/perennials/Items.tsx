import { useMemo, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectItems } from "./perennialsSlice"
import { ItemDisplay } from "./ItemDisplay"

export const Items = () => {
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

  return (
    <>
      <div className="sm:col-span-4 my-8 ">
        <label
          htmlFor="search"
          className="block text-xl font-medium leading-6 text-gray-900"
        >
          Search
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input
              type="text"
              name="search"
              id="search"
              onChange={e => setSearch(e.target.value)}
              value={search}
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Japanese Maple"
            />
          </div>
        </div>
      </div>

      {filteredItems.length ? (
        <ul className="divide-y divide-gray-100">
          {filteredItems.map(item => (
            <ItemDisplay item={item} key={item.value + item.d + item.p} />
          ))}
        </ul>
      ) : (
        <p>Nothing matches that search</p>
      )}
    </>
  )
}
