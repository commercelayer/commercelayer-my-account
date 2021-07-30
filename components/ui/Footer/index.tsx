import { useTranslation } from "react-i18next"
import styled from "styled-components"
import tw from "twin.macro"

import { Logo } from "./cl"

interface Props {
  termsUrl?: string
  privacyUrl?: string
}

const Footer: React.FC<Props> = ({ termsUrl, privacyUrl }) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <a
        target="_blank"
        href="https://commercelayer.io/"
        rel="noreferrer"
        className="group"
      >
        <LogoWrapper>
          Powered by <Logo width="114" height="19" tw="pl-2" />
        </LogoWrapper>
      </a>
      {(termsUrl || privacyUrl) && (
        <ListWrapper>
          <ListLink>
            {termsUrl && (
              <ListItem>
                <a target="_blank" href={termsUrl} rel="noreferrer">
                  {t("general.terms_link")}
                </a>
              </ListItem>
            )}
            {privacyUrl && (
              <ListItem>
                <a target="_blank" href={privacyUrl} rel="noreferrer">
                  {t("general.privacy_link")}
                </a>
              </ListItem>
            )}
          </ListLink>
        </ListWrapper>
      )}
    </Wrapper>
  )
}

export default Footer

const Wrapper = styled.div`
  ${tw`flex justify-between border-t pt-5 text-xs text-gray-500`}
`
const LogoWrapper = styled.div`
  ${tw`flex`}
`
const ListWrapper = styled.div`
  ${tw`overflow-hidden`}
`
const ListLink = styled.ul`
  ${tw`flex flex-row flex-wrap justify-between -ml-0.5`}
`
const ListItem = styled.li`
  ${tw`flex-grow px-1.5 md:px-4 border-l font-medium`}
`
