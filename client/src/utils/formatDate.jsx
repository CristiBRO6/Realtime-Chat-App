const locale = import.meta.env.VITE_LOCALE || 'en-US';

export const formatFullDate = (time) => {
  return new Date(time).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatShortDate = (time) => {
  return new Date(time).toLocaleDateString(locale, {
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};
