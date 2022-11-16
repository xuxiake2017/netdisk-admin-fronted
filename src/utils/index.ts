export const formatByte = (dataSize: number) => {
  if (dataSize || dataSize === 0) {
    if (dataSize > 1024 * 1024) {
      const res = dataSize / (1024 * 1024);
      return res.toFixed(2) + 'M';
    } else {
      const res = dataSize / 1024;
      return res.toFixed(2) + 'KB';
    }
  } else {
    return '-';
  }
};
