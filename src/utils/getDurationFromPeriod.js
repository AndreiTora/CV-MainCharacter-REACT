const MONTHS = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function parsePeriodPart(part) {
  const trimmed = (part || '').trim().toLowerCase();

  if (!trimmed) return null;

  if (trimmed === 'present' || trimmed === 'presente' || trimmed === 'actualidad' || trimmed === 'actualmente' || trimmed === 'current') {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  }

  const matchEs = trimmed.match(/([a-záéíóúñ]+)\s+de\s+(\d{4})/i);
  const matchEn = trimmed.match(/([a-z]+)\s+(\d{4})/i);
  const match = matchEs || matchEn;
  if (!match) {
    return null;
  }

  const monthName = match[1]
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const year = Number(match[2]);
  const month = MONTHS[monthName];

  if (!Number.isInteger(year) || month === undefined) return null;

  return { year, month };
}

export function getDurationFromPeriod(period, language = 'es') {
  if (!period || typeof period !== 'string') return '';

  const [startRaw, endRaw] = period.split('-');
  if (!startRaw || !endRaw) return '';

  const start = parsePeriodPart(startRaw);
  const end = parsePeriodPart(endRaw);

  if (!start || !end) return '';

  const totalMonths = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  if (totalMonths <= 0) return '';

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? (language === 'en' ? 'year' : 'año') : (language === 'en' ? 'years' : 'años')}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? (language === 'en' ? 'month' : 'mes') : (language === 'en' ? 'months' : 'meses')}`);
  }

  return parts.join(' ');
}
