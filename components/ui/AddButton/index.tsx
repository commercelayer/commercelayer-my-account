import { useTranslation } from "react-i18next"

import { Wrapper, Label, Svg } from "./styled"

interface Props {
  action: () => void
}

export const AddButton: React.FC<Props> = ({ action }) => {
  const { t } = useTranslation()

  return (
    <Wrapper onClick={action} className="group">
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
          clipRule="evenodd"
        />
      </Svg>
      <Label>{t("addresses.addNewAddress")}</Label>
    </Wrapper>
  )
}
