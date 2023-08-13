import { Product } from "@medusajs/medusa"
import JSONView from "../../../../../components/molecules/json-view"
import Section from "../../../../../components/organisms/section"
import useUserRole from "../../../../../hooks/use-user-role"
import Spinner from "../../../../../components/atoms/spinner"

type Props = {
  product: Product
}

/** Temporary component, should be replaced with <RawJson /> but since the design is different we will use this to not break the existing design across admin. */
const RawSection = ({ product }: Props) => {
  const { isDev, isLoading } = useUserRole();

  if (isLoading) {
    return <Section title="Raw Product">
      <Spinner />
    </Section>
  }

  if (!isDev) return null;

  return (
    <Section title="Raw Product">
      <div className="pt-base">
        <JSONView data={product} />
      </div>
    </Section>
  )
}

export default RawSection
