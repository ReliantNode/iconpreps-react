export function formatAddress(address, start = 8, end = 4) {
  return `${address.substr(0, start)}…${address.substr(-end)}`;
}
