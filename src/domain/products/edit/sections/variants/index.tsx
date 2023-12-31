import { Product, ProductVariant } from "@medusajs/medusa"
import React, { useState } from "react"
import EditIcon from "../../../../../components/fundamentals/icons/edit-icon"
import GearIcon from "../../../../../components/fundamentals/icons/gear-icon"
import PlusIcon from "../../../../../components/fundamentals/icons/plus-icon"
import { ActionType } from "../../../../../components/molecules/actionables"
import Section from "../../../../../components/organisms/section"
import useToggleState from "../../../../../hooks/use-toggle-state"
import useEditProductActions from "../../hooks/use-edit-product-actions"
import AddVariantModal from "./add-variant-modal"
import EditVariantModal from "./edit-variant-modal"
import EditVariantsModal from "./edit-variants-modal"
import OptionsModal from "./options-modal"
import OptionsProvider, { useOptionsContext } from "./options-provider"
import VariantsTable from "./table"
import useUserRole from "../../../../../hooks/use-user-role"

type Props = {
  product: Product
}

const VariantsSection = ({ product }: Props) => {
  const [variantToEdit, setVariantToEdit] = useState<
    { base: ProductVariant; isDuplicate: boolean } | undefined
  >(undefined)
  const { isMem } = useUserRole()

  const {
    state: optionState,
    close: closeOptions,
    toggle: toggleOptions,
  } = useToggleState()

  const {
    state: addVariantState,
    close: closeAddVariant,
    toggle: toggleAddVariant,
  } = useToggleState()

  const {
    state: editVariantsState,
    close: closeEditVariants,
    toggle: toggleEditVariants,
  } = useToggleState()

  const actions: ActionType[] = [
    {
      label: "Add Variant",
      onClick: toggleAddVariant,
      icon: <PlusIcon size="20" />,
    },
    {
      label: "Edit Variants",
      onClick: toggleEditVariants,
      icon: <EditIcon size="20" />,
    },
    {
      label: "Edit Options",
      onClick: toggleOptions,
      icon: <GearIcon size="20" />,
    },
  ]

  const { onDeleteVariant } = useEditProductActions(product.id)

  const handleDeleteVariant = (variantId: string) => {
    onDeleteVariant(variantId)
  }

  const handleEditVariant = (variant: ProductVariant) => {
    setVariantToEdit({ base: variant, isDuplicate: false })
  }

  const handleDuplicateVariant = (variant: ProductVariant) => {
    // @ts-ignore
    setVariantToEdit({ base: { ...variant, options: [] }, isDuplicate: true })
  }

  return (
    <OptionsProvider product={product}>
      <Section title="Variants" actions={!isMem ? actions : []}>
        <ProductOptions />
        <div className="mt-xlarge">
          <h2 className="inter-large-semibold mb-base">
            Product variants{" "}
            <span className="inter-large-regular text-grey-50">
              ({product.variants.length})
            </span>
          </h2>
          <VariantsTable
            variants={product.variants}
            actions={{
              deleteVariant: handleDeleteVariant,
              updateVariant: handleEditVariant,
              duplicateVariant: handleDuplicateVariant,
            }}
          />
        </div>
      </Section>
      <OptionsModal
        open={optionState}
        onClose={closeOptions}
        product={product}
      />
      <AddVariantModal
        open={addVariantState}
        onClose={closeAddVariant}
        product={product}
      />
      <EditVariantsModal
        open={editVariantsState}
        onClose={closeEditVariants}
        product={product}
      />
      {variantToEdit && (
        <EditVariantModal
          variant={variantToEdit.base}
          isDuplicate={variantToEdit.isDuplicate}
          product={product}
          onClose={() => setVariantToEdit(undefined)}
        />
      )}
    </OptionsProvider>
  )
}

const ProductOptions = () => {
  const { options, status } = useOptionsContext()

  if (status === "error") {
    return null
  }

  if (status === "loading" || !options) {
    return (
      <div className="mt-base grid grid-cols-3 gap-x-8">
        {Array.from(Array(2)).map((_, i) => {
          return (
            <div key={i}>
              <div className="mb-xsmall h-6 w-9 animate-pulse bg-grey-30"></div>
              <ul className="flex flex-wrap items-center gap-1">
                {Array.from(Array(3)).map((_, j) => (
                  <li key={j}>
                    <div className="h-8 w-12 animate-pulse rounded-rounded bg-grey-10 text-grey-50">
                      {j}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="mt-base flex flex-wrap items-center gap-8">
      {options.map((option) => {
        return (
          <div key={option.id}>
            <h3 className="inter-base-semibold mb-xsmall">{option.title}</h3>
            <ul className="flex flex-wrap items-center gap-1">
              {option.values
                ?.map((val) => val.value)
                .filter((v, index, self) => self.indexOf(v) === index)
                .map((v, i) => (
                  <li key={i}>
                    <div className="inter-small-semibold whitespace-nowrap rounded-rounded bg-grey-10 px-3 py-[6px] text-grey-50">
                      {v}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default VariantsSection
