export const isDifferentDay = (currentMessage, previousMessage) => {
  const currentDate = new Date(currentMessage.createdAt).toDateString();
  const previousDate = previousMessage ? new Date(previousMessage.createdAt).toDateString() : null;
  return currentDate !== previousDate;
};