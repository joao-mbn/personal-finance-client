import { ptBR } from '../languages';

export function parseBackendCodedMessages(codedMessage: string) {
  const [_templateCode, ...fieldsCodes] = codedMessage.split('|');
  const templateCode = _templateCode as keyof typeof ptBR;
  const template = ptBR[templateCode] as string | undefined;

  if (!template) return null;

  const fields = fieldsCodes.reduce((acc, curr) => {
    const [key, value] = curr.split(':');
    if (!key || !value) return acc;

    return { ...acc, [key]: value };
  }, {}) as Record<string, string>;

  return { templateCode, template, fields };
}

export function fillStringTemplate(template: string, fields: Record<string, string>) {
  let parsedMessage = template;
  let match: RegExpExecArray | null;
  const templateRegex = /{{[\w\- ]+}}/g;

  while ((match = templateRegex.exec(template)) !== null) {
    const key = match[0].replace(/[{ }]/g, '');

    if (key in fields) {
      const value = ptBR[fields[key] as keyof typeof ptBR] ?? fields[key];
      parsedMessage = parsedMessage.replace(match[0], value);
    }
  }

  return parsedMessage;
}
