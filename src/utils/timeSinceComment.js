const countTimeSinceComment = (createdAt) => {
  const now = new Date();
  const createTime = new Date(createdAt);
  const elapsed = now.getTime() - createTime.getTime();
  let createdMinutes = createTime.getMinutes();
  createdMinutes = createdMinutes < 10 ? `0${createdMinutes}` : createdMinutes;
  let message;
  const months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
  ];
  if (elapsed < 60000) {
    message = '1 минуту назад';
  } else if (elapsed >= 60000 && elapsed < 300000) {
    message = '5 минут назад';
  } else if (elapsed >= 300000 && elapsed < 600000) {
    message = '10 минут назад';
  } else if (elapsed >= 600000 && elapsed < 1800000) {
    message = '30 минут назад';
  } else if (elapsed >= 1800000 && elapsed < 86400000) {
    message = `${createTime.getHours()}:${createdMinutes}`;
  } else if (elapsed >= 86400000 && elapsed < 31540000000) {
    message = `${createTime.getDate()} ${months[createTime.getMonth()]}`;
  } else if (elapsed >= 31540000000) {
    message = `${createTime.getDate()} ${
      months[createTime.getMonth()]
    } ${createTime.getFullYear()} года`;
  }
  return message;
};

export default countTimeSinceComment;
