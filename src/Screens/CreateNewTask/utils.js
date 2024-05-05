export const getRandomNumber = usedNumbers => {
  let randomNumber = Math.floor(Math.random() * 4);
  if (usedNumbers.current.length === 4) {
    usedNumbers.current = [];
  }
  while (usedNumbers.current.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * 4);
  }
  usedNumbers.current.push(randomNumber);

  return randomNumber;
};
