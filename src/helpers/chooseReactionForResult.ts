export const chooseReactionForResult = (
correct: number,
length: number,
) => {  

  const correctPercentage = +((correct / length) * 100).toFixed();

  const correctForm = correct < 5
  ? 'питання'
  : 'питань';

  console.log(correctPercentage);

  const random = Math.floor(Math.random() * 10) + 1;

  if (correctPercentage === 100) {
    return {
      imgSrc: `./gif/100/${random}.gif`,
      congratText: `Ви правильно відповіли на ${correct} ${correctForm} з ${length}`
    }

  }
  if (correctPercentage >= 80) {
    return {
      imgSrc: `./gif/80/${random}.gif`,
      congratText: `Ви правильно відповіли на ${correct} ${correctForm} з ${length}`
    }

  }
  if (correctPercentage >= 60) {
    return {
      imgSrc: `./gif/60/${random}.gif`,
      congratText: `Ви правильно відповіли на ${correct} ${correctForm} з ${length}`
    }

  }
  if (correctPercentage >= 40) {
    return {
      imgSrc: `./gif/40/${random}.gif`,
      congratText: `Ви правильно відповіли на ${correct} ${correctForm} з ${length}`
    }

  }
  if (correctPercentage >= 20) {
    return {
      imgSrc: `./gif/20/${random}.gif`,
      congratText: `Ви правильно відповіли на ${correct} ${correctForm} з ${length}`
    }
  }

  return {
    imgSrc: `./gif/0/${random}.gif`,
    congratText: `Ви правильно відповіли на ${correct} ${correctForm} з ${length}`
  }
}



