import { isString } from 'lodash-es'
import { ChevronLeft } from 'lucide-react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { routes } from '../routes'
import { BackLink } from './BackLink'
import { IconButton } from './buttons/IconButton'
import { CloseIcon } from './Icons/CloseIcon'

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 18px;

  a {
    flex: 1;
  }

  hr {
    margin: 0 auto;
    visibility: hidden;
    flex: 1;
  }
`

interface IconBarProps {
  back?: boolean | string
  close?: boolean | string
  childAfter?: React.ReactNode
  children?: React.ReactNode
}

export const IconBar: FC<IconBarProps> = ({ back, close, childAfter, children, ...rest }) => (
  <Bar {...rest}>
    {back ? (
      <BackLink aria-label="Back">
        <IconButton size={40}>
          <ChevronLeft />
        </IconButton>
      </BackLink>
    ) : (
      <hr />
    )}

    {children}

    {childAfter ? (
      <>{childAfter}</>
    ) : close ? (
      <Link to={isString(close) ? close : routes.addressTokens()} aria-label="Close" style={{ textAlign: 'right' }}>
        <CloseIcon />
      </Link>
    ) : (
      <hr />
    )}
  </Bar>
)
