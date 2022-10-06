import { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { getPreAuthorizations, resetPreAuthorizations } from '../../../background/preAuthorizations'
import { Button } from '../../components/buttons/Button'
import { IconBar } from '../../components/IconBar'
import { removePreAuthorization } from '../../services/background'
import { H2, P } from '../../theme/Typography'
import { DappConnection } from './DappConnection'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 32px 24px 32px;

  ${P} {
    margin: 16px 0;
  }

  ${Button} {
    margin-top: 8px;
  }

  > * + * {
    margin-top: 8px;
  }
`

export const DappConnectionsSettingsScreen: FC = () => {
  const navigate = useNavigate()
  const [preAuthorizations, setPreAuthorizations] = useState<string[]>([])

  const requestPreAuthorizations = useCallback(async () => {
    setPreAuthorizations(await getPreAuthorizations())
  }, [])

  useEffect(() => {
    requestPreAuthorizations()
    // on mount
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <IconBar back />
      <Wrapper>
        <H2>Dapp connections</H2>
        {preAuthorizations.length === 0 ? (
          <P>You haven&apos;t connected to any dapp yet.</P>
        ) : (
          <>
            {preAuthorizations.map((dapp) => (
              <DappConnection
                key={dapp}
                host={dapp}
                onRemoveClick={async () => {
                  await removePreAuthorization(dapp)
                  requestPreAuthorizations()
                }}
              />
            ))}

            <P>Require all dapps to request a new connection to your wallet?</P>
            <Button
              onClick={() => {
                resetPreAuthorizations()
                navigate(-1)
              }}
            >
              Reset all dapp connections
            </Button>
          </>
        )}
      </Wrapper>
    </>
  )
}
