const HTML_CHARACTERS_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '`': '&grave;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

const REGEXP = /[&<>"'/]/gi;

export function sanitizeInput(string) {
  return string
    .replace(REGEXP, match => HTML_CHARACTERS_MAP[match])
    .replace(/(?:\r\n|\r|\n)/g, '<br>');
}
