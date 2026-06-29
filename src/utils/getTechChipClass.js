export function getTechChipClass(name) {
  const tech = String(name).toLowerCase();
  if (/\bjava\b|spring|hibernate|struts|soap|microservicios|apis? rest|rest/.test(tech)) return 'tech-chip-backend';
  if (/react|typescript|javascript|jquery|bootstrap|jstl|sass|ajax/.test(tech)) return 'tech-chip-frontend';
  if (/liferay|jboss|apache tomcat|oracle weblogic/.test(tech)) return 'tech-chip-platform';
  if (/oracle|microsoft sql server|mysql|postgresql|database/.test(tech)) return 'tech-chip-db';
  if (/maven|jenkins|gitlab|git/.test(tech)) return 'tech-chip-devops';
  return 'tech-chip-default';
}
