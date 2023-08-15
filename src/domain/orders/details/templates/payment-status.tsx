import React from "react"

import StatusDot from "../../../../components/fundamentals/status-indicator"

export const PaymentStatusComponent = ({ status }) => {
  switch (status) {

    case "refunded":
      return <StatusDot title="Refunded" variant="warning" />
    case "partially_refunded":
      return <StatusDot title="Refunded" variant="warning" />
    case "captured":
      return <StatusDot title="Paid" variant="success" />
    case "awaiting":
      return <StatusDot title="Awaiting payment" variant="danger" />
    case "canceled":
      return <StatusDot title="Canceled" variant="danger" />
    case "requires_action":
      return <StatusDot title="Requires Action" variant="danger" />
    default:
      return null
  }
}
