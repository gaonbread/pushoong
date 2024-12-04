export const formatSection = (array: any, title: string) => {
  if (array.length > 0) {
    const formattedArray = array.map((item: any) => ` - ${item}`);

    return `${title}:\n\n${formattedArray.join('\n')}`;
  }
  return '';
};
