const urlToFile = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], 'image.png', { type: blob.type });
};

export default urlToFile;