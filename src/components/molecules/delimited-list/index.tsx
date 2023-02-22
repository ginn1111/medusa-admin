import React from "react"
import Tooltip from "../../atoms/tooltip"

type DelimitedListProps<T = unknown> = {
  list: Record<string, T>[]
  delimit?: number
}

const DelimitedList: React.FC<DelimitedListProps> = ({
  list,
  delimit = 1,
}) => {
  if (!list.length) {
    return <></>
  }

  const itemsToDisplay = list.slice(0, delimit).join(", ")
  const showExtraItemsInTooltip = list.length > delimit
  const extraItemsInToolTipCount = list.length - delimit

  const ToolTipContent = () => {
    return (
      <div className="flex flex-col">
        {list.slice(delimit).map((listItem) => (
          <span key={listItem}>{listItem}</span>
        ))}
      </div>
    )
  }

  return (
    <span className="inter-small-regular">
      {itemsToDisplay}

      {showExtraItemsInTooltip && (
        <Tooltip content={<ToolTipContent />}>
          <span className="text-grey-40"> + {extraItemsInToolTipCount} more</span>
        </Tooltip>
      )}
    </span>
  )
}

export default DelimitedList
