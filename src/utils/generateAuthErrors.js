export function generateAuthErrors(error) {
  switch (error) {
    case 'EMAIL_EXISTS':
      return 'Пользователь с такой почтой уже существует';
    case 'INVALID_PASSWORD':
      return 'Емэйл или пароль введены неверно';
    default:
      return 'Слишком много попыток входа. Попробуйте позже';
  }
}
