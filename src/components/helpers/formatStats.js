export function formatStats(
  kills = 0,
  deaths = 0,
  assists = 0,
  fraction = false
) {
  if (fraction)
    return `${kills.toFixed(1)}/${deaths.toFixed(1)}/${assists.toFixed(1)}`;
  return `${kills}/${deaths}/${assists}`;
}

export function formatStatsObject(kdaObject = {}, fraction = false) {
  if (fraction)
    return `${kdaObject?.kills.toFixed(1) || (0.0).toFixed(1)}/${
      kdaObject?.deaths.toFixed(1) || (0.0).toFixed(1)
    }/${kdaObject?.assists.toFixed(1) || (0.0).toFixed(1)}`;
  return `${kdaObject?.kills || 0}/${kdaObject?.deaths || 0}/${
    kdaObject?.assists || 0
  }`;
}
