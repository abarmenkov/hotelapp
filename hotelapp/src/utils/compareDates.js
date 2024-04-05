export const compareDate = (datestring) => {
  const now = new Date();
  const reservationDate = new Date(datestring);
  return now.toDateString() === reservationDate.toDateString();
};
