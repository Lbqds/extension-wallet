import { useCallback } from 'react'
import { Resolver } from 'react-hook-form'
import { AnySchema, InferType, ValidationError } from 'yup'

function deleteEmptyStringFields(obj: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== ''))
}

export const useYupValidationResolver = <S extends AnySchema>(validationSchema: S) =>
  useCallback<Resolver<InferType<S>>>(
    async (data) => {
      try {
        const values = await validationSchema.validate(deleteEmptyStringFields(data), {
          abortEarly: false
        })

        return {
          values,
          errors: {}
        }
      } catch (errors) {
        if (errors instanceof ValidationError) {
          return {
            values: data,
            errors: errors.inner.reduce(
              (allErrors, currentError) => ({
                ...allErrors,
                [currentError.path ?? 'unknownPath']: {
                  type: currentError.type ?? 'validation',
                  message: currentError.message
                }
              }),
              {}
            )
          }
        }
        return {
          values: data,
          errors: {
            unknownError: {
              type: 'unknown',
              message: 'Unknown error'
            }
          }
        }
      }
    },
    [validationSchema]
  )
