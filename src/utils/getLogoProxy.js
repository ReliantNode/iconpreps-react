export const LOGO_FALLBACK = 'https://iconpreps.com/images/no-logo.svg';

export function getLogoProxy(logoUrl) {
  return `https://images.weserv.nl/?url=${logoUrl}&default=${LOGO_FALLBACK}`;
}
