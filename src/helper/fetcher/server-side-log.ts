export const serverSideLog = (
  message: string | object = '',
  type: 'info' | 'success' | 'error' = 'info',
) => {
  if (type === 'error') {
    console.error(JSON.stringify(message));
  } else {
    console.info(JSON.stringify(message));
  }
};
