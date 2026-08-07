export const parseDeepLink = (link: string) => {
  const match = link.match(
    /^notificationproject:\/\/(?<screen>[^\/]+)\/(?<id>\d+)$/,
  );

  return match?.groups ?? {};
};
