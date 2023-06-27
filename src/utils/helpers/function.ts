

export const arrangeDate = () => {
  const dateNow = new Date();
  const aWeekFromNow = new Date(dateNow.getTime() + 7 * 24 * 60 * 60 * 1000);
  return aWeekFromNow;
};

export const isWholeNumberOrZero =(num:number) => {
  if (Number.isInteger(num) || typeof num === 'number') {
    return Number.isInteger(num) || num === 0;
  }
  return false;
}


// export a function that takes a date as input and returns a formatted date string as dd-mm-yyyy
export const formatDate = (date: Date) => {
  const formatedDate = date.toString().split('T')[0];


  return formatedDate;
} 