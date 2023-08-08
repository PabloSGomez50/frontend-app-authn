const isOneTrustFunctionalCookieEnabled = () => {
  const isBrowser = typeof window !== 'undefined';
  if (!isBrowser) {
    return false;
  }

  return !!window?.OnetrustActiveGroups?.includes('C0003');
};

export default isOneTrustFunctionalCookieEnabled;
