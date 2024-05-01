export const convertByteToString = (input) => {
  const decoder = new TextDecoder();
  return decoder.decode(input);
};

export const convertToJSON = (input) => JSON.parse(input);
