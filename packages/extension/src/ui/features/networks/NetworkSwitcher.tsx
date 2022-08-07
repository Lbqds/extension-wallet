import { FC } from "react"
import { useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"

import { getNetwork } from "../../../shared/networks"
import { NetworkStatusIndicator } from "../../components/StatusIndicator"
import { recover } from "../recovery/recovery.service"
import { useNetworkState } from "./networks.state"
import { useNetworks } from "./useNetworks"

const NetworkName = styled.span`
  text-align: right;
`

const Network = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: right;

  font-weight: 600;
  font-size: 12px;
  line-height: 14.4px;

  background-color: rgba(255, 255, 255, 0.15);
  padding: 8px 12px;

  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  font-size: 12px;
  line-height: 14.4px;

  color: ${({ theme, selected }) =>
    selected ? theme.text1 : "rgba(255, 255, 255, 0.7)"};
  &:hover {
    color: ${({ theme }) => theme.text1};
  }

  cursor: ${({ selected }) => (selected ? "default" : "pointer")};

  > span {
    padding-right: 5px;
  }
`

const NetworkList = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  z-index: 1;
  background: ${({ theme }) => theme.bg1};
  border-radius: 0 0 15px 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

  & > ${Network} {
    border-top: 1px #525252 solid;
  }

  & > ${Network}:last-child {
    border-radius: 0 0 15px 15px;
  }
`

const NetworkSwitcherWrapper = styled.div<{
  disabled?: boolean
}>`
  position: relative;

  & > ${Network} {
    border-radius: 30px;
  }

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover ${NetworkList} {
        display: block;
      }

      &:hover > ${Network} {
        border-radius: 15px 15px 0 0;
      }

      &:hover ${NetworkName} {
        min-width: 110px;
      }
    `}
`

export const NetworkStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 4px;
`

interface NetworkSwitcherProps {
  disabled?: boolean
}

export const NetworkSwitcher: FC<NetworkSwitcherProps> = ({ disabled }) => {
  const navigate = useNavigate()
  const { switcherNetworkId, setSwitcherNetworkId } = useNetworkState()
  const { allNetworks } = useNetworks({ suspense: true })
  const currentNetwork = getNetwork(switcherNetworkId, allNetworks)
  const otherNetworks = allNetworks.filter(
    (network) => network !== currentNetwork,
  )

  return (
    <NetworkSwitcherWrapper disabled={disabled}>
      <Network selected role="button" aria-label="Selected network">
        <NetworkName>{currentNetwork.name}</NetworkName>
        <NetworkStatusIndicator color={"green"} />
      </Network>
      <NetworkList>
        {otherNetworks.map(({ id, name }) => (
          <Network
            key={id}
            onClick={async () => {
              setSwitcherNetworkId(id)
              navigate(await recover())
            }}
          >
            <NetworkName>{name}</NetworkName>
            <NetworkStatusIndicator color={"green"} />
          </Network>
        ))}
      </NetworkList>
    </NetworkSwitcherWrapper>
  )
}
