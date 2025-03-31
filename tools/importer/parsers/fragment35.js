export default function parse(element, { document }) {
  const tableHeader = [document.createElement('strong')];
  tableHeader[0].textContent = 'Fragment';

  const referenceLink = document.createElement('a');
  referenceLink.href = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/fragment-include';
  referenceLink.textContent = referenceLink.href;

  const tableContentRow = [referenceLink];
  const tableData = [tableHeader, tableContentRow];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}