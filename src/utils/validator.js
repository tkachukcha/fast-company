export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') {
          statusValidate = !data;
        } else if (Array.isArray(data)) {
          statusValidate = data.length === 0;
        } else {
          statusValidate = data.trim() === '';
        }
        break;
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case 'hasCapital': {
        const capitalRegExp = /[A-Z]+/;
        statusValidate = !capitalRegExp.test(data);
        break;
      }
      case 'hasDigit': {
        const digitRegExp = /\d+/;
        statusValidate = !digitRegExp.test(data);
        break;
      }
      case 'minSymbolNum': {
        statusValidate = data.length < config.value;
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
