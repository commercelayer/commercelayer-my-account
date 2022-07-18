import "../styles/globals.css"
import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"
import "components/data/i18n"
import { useRouter } from "next/router"

import { RetryError } from "components/composite/RetryError"
import { useSettingsOrInvalid } from "components/hooks/useSettingsOrInvalid"

import MyAccountSkeleton from "components/composite/MyAccountSkeleton"
import dynamic from "next/dynamic"

function MyAccount(props: AppProps) {
  const { Component, pageProps } = props

  const DynamicInvalid = dynamic(() => import("components/composite/Invalid"))

  const DynamicAppContainer = dynamic(
    () => import("components/composite/MyAccountContainer"),
    {
      loading: function LoadingSkeleton() {
        return <MyAccountSkeleton />
      }
    }
  )

  const router = useRouter()
  const { settings, retryOnError, isLoading } = useSettingsOrInvalid()
  if (router.pathname != '/404') {
    if (isLoading) return <MyAccountSkeleton />
    if (!isLoading && !settings) return <DynamicInvalid />
    if (!settings || retryOnError) return <RetryError />

    /** If you are a Guest user you can view just the order detail and children pages */
    if (settings && settings.isGuest && router.pathname.indexOf('/orders/[orderId]') == -1) {
      router.push(`/404?accessToken=${settings.accessToken}`)
    }

    return (
      <DynamicAppContainer settings={settings}>
        <Component {...pageProps} settings={settings} />
      </DynamicAppContainer>
    )
  } else {
    return <Component {...pageProps} />
  }
  
  
}

export default appWithTranslation(MyAccount)
