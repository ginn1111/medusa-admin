import { useAdminGetSession, useAdminStore } from "medusa-react"
import React, { useState } from "react"
import { useFeatureFlag } from "../../../context/feature-flag"
import BuildingsIcon from "../../fundamentals/icons/buildings-icon"
import CartIcon from "../../fundamentals/icons/cart-icon"
import CashIcon from "../../fundamentals/icons/cash-icon"
import GearIcon from "../../fundamentals/icons/gear-icon"
import GiftIcon from "../../fundamentals/icons/gift-icon"
import SaleIcon from "../../fundamentals/icons/sale-icon"
import TagIcon from "../../fundamentals/icons/tag-icon"
import UsersIcon from "../../fundamentals/icons/users-icon"
import SidebarMenuItem from "../../molecules/sidebar-menu-item"
import UserMenu from "../../molecules/user-menu"
import useUserRole from "../../../hooks/use-user-role"

const ICON_SIZE = 20

const Sidebar: React.FC = () => {
  const [currentlyOpen, setCurrentlyOpen] = useState(-1)
  const { user } = useAdminGetSession()
  const { isMem } = useUserRole()

  const { store } = useAdminStore()

  const triggerHandler = () => {
    const id = triggerHandler.id++
    return {
      open: currentlyOpen === id,
      handleTriggerClick: () => setCurrentlyOpen(id),
    }
  }
  // We store the `id` counter on the function object, as a state creates
  // infinite updates, and we do not want the variable to be free floating.
  triggerHandler.id = 0

  const { isFeatureEnabled } = useFeatureFlag()

  const inventoryEnabled =
    isFeatureEnabled("inventoryService") &&
    isFeatureEnabled("stockLocationService")

  return (
    <div className="bg-gray-0 h-screen min-w-sidebar max-w-sidebar overflow-y-auto border-r border-grey-20 py-base px-base">
      <div className="h-full">
        <div className="flex justify-between px-2 items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-circle border border-solid border-gray-300">
            <UserMenu />
          </div>
          <p className="capitalize text-[12px] font-semibold text-slate-400 mr-auto ml-2 line-clamp-1">{user?.first_name}</p>
          <p className="text-[11px] font-semibold capitalize px-2 bg-green-100 rounded-lg text-green-500">{user?.role}</p>
        </div>
        <div className="my-base flex flex-col px-2">
          <span className="text-small font-medium text-grey-50">Store</span>
          <span className="text-medium font-medium text-grey-90">
            {store?.name}
          </span>
        </div>
        <div className="py-3.5">
          <SidebarMenuItem
            pageLink={"/a/orders"}
            icon={<CartIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={"Orders"}
          />
          <SidebarMenuItem
            pageLink={"/a/products"}
            icon={<TagIcon size={ICON_SIZE} />}
            text={"Products"}
            triggerHandler={triggerHandler}
          />
          {!isMem && <SidebarMenuItem
            pageLink={"/a/customers"}
            icon={<UsersIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={"Customers"}
          />}
          {/* {inventoryEnabled && (
            <SidebarMenuItem
              pageLink={"/a/inventory"}
              icon={<BuildingsIcon size={ICON_SIZE} />}
              triggerHandler={triggerHandler}
              text={"Inventory"}
            />
          )} */}
          {/* <SidebarMenuItem
            pageLink={"/a/discounts"}
            icon={<SaleIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={"Discounts"}
          /> */}
          {/* <SidebarMenuItem
            pageLink={"/a/gift-cards"}
            icon={<GiftIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={"Gift Cards"}
          /> */}
          {/* <SidebarMenuItem
            pageLink={"/a/pricing"}
            icon={<CashIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={"Pricing"}
          /> */}
          {!isMem && <SidebarMenuItem
            pageLink={"/a/settings"}
            icon={<GearIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={"Settings"}
          />}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
