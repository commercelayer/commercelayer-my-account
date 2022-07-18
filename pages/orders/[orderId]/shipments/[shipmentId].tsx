import { NextPage } from "next"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

import { RetryError } from "components/composite/RetryError"
import { useSettingsOrInvalid } from "components/hooks/useSettingsOrInvalid"

import MyAccountSkeleton from "components/composite/MyAccountSkeleton"
import OrderShipment from "components/composite/OrderShipment"

const OrderShipmentPage: NextPage = () => {
  const DynamicInvalid = dynamic(() => import("components/composite/Invalid"))

  const DynamicAppContainer = dynamic(
    () => import("components/composite/MyAccountContainer"),
    {
      loading: function LoadingSkeleton() {
        return <MyAccountSkeleton />
      }
    }
  )

  const { settings, retryOnError, isLoading } = useSettingsOrInvalid()
  if (isLoading) return <MyAccountSkeleton />
  if (!isLoading && !settings) return <DynamicInvalid />
  if (!settings || retryOnError) return <RetryError />

  const { query } = useRouter()
  const orderId = query.orderId as string
  const shipmentId = query.shipmentId as string

  return (
    <DynamicAppContainer settings={settings}>
      <OrderShipment settings={settings} orderId={orderId} shipmentId={shipmentId} />
    </DynamicAppContainer>
  )
}

export default OrderShipmentPage
