const calculateGannValues = (num) => {
  if (num) {
    const root = Math.sqrt(num);
    const minusTwo = root - 2;
    const rounded = Math.ceil(minusTwo);
    const x = [];
    const sqrX = [];
    const sqrXRounded = [];
    const sqrXRoundedRoot = [];

    for (let i = 0; i < 24; i++) {
      x.push(rounded + 0.125 * (i + 1));
      sqrX.push(x[i] * x[i]);
      sqrXRounded.push(Math.round(sqrX[i] * 100) / 100);
      sqrXRoundedRoot.push(Math.round((num - sqrXRounded[i]) * 100) / 100);
    }

    let minPositiveIndex = -1;
    for (let i = 0; i < sqrXRoundedRoot.length; i++) {
      if (sqrXRoundedRoot[i] < 0) {
        minPositiveIndex = i;
        break;
      }
    }

    const support = [];
    const resistance = [];
    const buyTarget = [];
    const sellTarget = [];

    function roundup(number, places) {
      const factor = Math.pow(10, places);
      return Math.round(number * factor) / factor;
    }

    if (minPositiveIndex >= 0) {
      const buyAbove = sqrXRounded[minPositiveIndex];
      const sellBelow = sqrXRounded[minPositiveIndex - 1];

      for (let i = 0; i < 5; i++) {
        support.push(sqrXRounded[minPositiveIndex - 2 - i]);
        resistance.push(sqrXRounded[minPositiveIndex + 1 + i]);
        buyTarget.push(roundup(resistance[i] * 0.9995, 2));
        sellTarget.push(roundup(support[i] * 1.0005, 2));
      }
      return {
        buyAbove,
        sellBelow,
        buyTarget,
        sellTarget,
        resistance,
        support,
      };
    } else {
      return {
        buyAbove: "",
        sellBelow: "",
        buyTarget: ["", "", "", "", ""],
        sellTarget: ["", "", "", "", ""],
      };
    }
  } else {
    return {
      buyAbove: "",
      sellBelow: "",
      buyTarget: ["", "", "", "", ""],
      sellTarget: ["", "", "", "", ""],
    };
  }
};

module.exports = { calculateGannValues };
