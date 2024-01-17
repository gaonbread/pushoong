export const formatSection = (array: any, title: string) => {
  if (array.length > 0) {
    return `${title}:\n${array.join('\n')}`;
  }
  return '';
};
