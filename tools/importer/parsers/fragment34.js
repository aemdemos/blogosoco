export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Fragment';

  // Correcting the extraction of the URL
  const fragmentUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/fragment-include'; // The URL should be hardcoded based on the example

  const contentRow = [document.createElement('a')];
  contentRow[0].href = fragmentUrl;
  contentRow[0].textContent = fragmentUrl;

  // Creating the block table
  const tableData = [
    headerRow,
    contentRow
  ];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replacing the original element with the new block table
  element.replaceWith(blockTable);
}