export function getTechChipClass(name) {
  const tech = String(name).toLowerCase();
  if (/java|spring|hibernate|struts|soap|microservicios|apis? rest|rest|liferay/.test(tech)) return 'tech-chip-backend';
  if (/react|typescript|javascript|jquery|bootstrap|jstl|sass|ajax/.test(tech)) return 'tech-chip-frontend';
  if (/oracle|microsoft sql server|mysql|postgresql|database/.test(tech)) return 'tech-chip-db';
  if (/maven|jenkins|gitlab|git/.test(tech)) return 'tech-chip-devops';
  if (/liferay|jboss|apache tomcat|oracle weblogic/.test(tech)) return 'tech-chip-platform';
  return 'tech-chip-default';
}
