import { useRouter } from "next/router"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface UseSettingsOrInvalid {
  settings: CustomerSettings | undefined
  retryOnError?: boolean
  isLoading: boolean
}

export const useSettingsOrInvalid = (): UseSettingsOrInvalid => {
  const router = useRouter()
  const { orderId, accessToken } = router.query

  const orderIdQuery = orderId ? `&orderId=${orderId}` : ""

  const { data, error } = useSWR(
    router.isReady
      ? `${process.env.NEXT_PUBLIC_BASE_PATH}/api/settings?accessToken=${accessToken}${orderIdQuery}`
      : null,
    fetcher,
    { revalidateOnFocus: false }
  )

  if (router.isReady && !accessToken) {
    return { settings: undefined, isLoading: false }
  }

  if (!data && !error) {
    return { settings: undefined, isLoading: true }
  }

  if (error || !data?.validUserArea) {
    return { settings: undefined, retryOnError: true, isLoading: false }
  }

  return {
    settings: data,
    isLoading: false,
  }
}
