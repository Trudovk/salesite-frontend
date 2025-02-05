const getDiscountStatus = (start: string, end: string) => {
  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (now < startDate) {
    const daysLeft = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return {
      isActive: false,
      status: `Начнется через ${daysLeft} дн.`,
      daysLeft,
    };
  }

  if (now > endDate) {
    return {
      isActive: false,
      status: 'Завершена',
      daysLeft: 0,
    };
  }

  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
  return {
    isActive: true,
    status: daysLeft === 1 ? 'Завершается сегодня' : `Осталось ${daysLeft} дн.`,
    daysLeft,
  };
};

export default getDiscountStatus;
