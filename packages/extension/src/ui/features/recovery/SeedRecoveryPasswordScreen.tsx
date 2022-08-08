import { FC } from "react"
import { useNavigate } from "react-router-dom"

import { recoverBySeedPhrase } from "../../services/backgroundRecovery"
import { NewWalletScreen } from "../onboarding/NewWalletScreen"
import { recover } from "./recovery.service"
import {
  useSeedRecovery,
  validateAndSetPassword,
  validateSeedRecoveryCompletion,
} from "./seedRecovery.state"

export const SeedRecoveryPasswordScreen: FC = () => {
  const navigate = useNavigate()

  return (
    <NewWalletScreen
      overrideTitle="New password"
      overrideSubmitText="Continue"
      overrideSubmit={async ({ password }) => {
        try {
          validateAndSetPassword(password)
          const state = useSeedRecovery.getState()
          if (validateSeedRecoveryCompletion(state)) {
            await recoverBySeedPhrase(state.seedPhrase, state.password)
            navigate(await recover())
          }
        } catch {
          console.error("seed phrase is invalid")
        }
      }}
    />
  )
}
