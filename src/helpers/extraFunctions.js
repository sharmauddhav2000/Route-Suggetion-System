export const celsius = (x) => (x - 273).toFixed(2);

export const dateFormat = (dt) => {
  const milliseconds = dt * 1000;

  let myDate = new Date(milliseconds);

  let date = myDate.toLocaleString('en-GB').split(',')[0];

  let day = myDate.toLocaleString('en-US', { weekday: 'long' });

  return { date, day };
};

export const greetingMessage = () => {
  let currentHr = new Date().getHours();
  let greeting =
    currentHr < 12
      ? 'Good Morning'
      : currentHr >= 18
      ? 'Good Evening'
      : 'Good Afternoon';

  return greeting;
};
