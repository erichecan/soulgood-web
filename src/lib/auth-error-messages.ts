const ERROR_MESSAGE_KEYS = {
  "invalid-credentials": "errorInvalidCredentials",
  "duplicate-email": "errorDuplicateEmail",
  "password-too-short": "errorPasswordTooShort",
} as const;

export type AuthErrorCode = keyof typeof ERROR_MESSAGE_KEYS | "generic";

export function authErrorMessageKey(code: string | undefined) {
  if (code && code in ERROR_MESSAGE_KEYS) {
    return ERROR_MESSAGE_KEYS[code as keyof typeof ERROR_MESSAGE_KEYS];
  }
  return "errorGeneric";
}
