const sgvToMbg = (sgv: number) => {
  return Math.round((sgv / 18) * 10) / 10;
};

export { sgvToMbg };
