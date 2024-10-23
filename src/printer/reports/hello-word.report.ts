import { type TDocumentDefinitions } from 'pdfmake/interfaces';

export const getHelloWorldReport = (): TDocumentDefinitions => {
  const doc: TDocumentDefinitions = { content: 'Hello, World!' };
  return doc;
};
