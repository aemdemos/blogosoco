export default function parse(element, { document }) {
  // Header row must exactly match the example
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Fragment';

  // Extract fragment URL dynamically from the element
  const linkElement = element.querySelector('a[href]');
  let fragmentUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/fragment-include'; // Default fallback URL

  // Check if the linkElement exists and has an absolute URL
  if (linkElement && linkElement.href.startsWith('http')) {
    fragmentUrl = linkElement.href;
  }

  // Create content row with dynamically extracted or fallback absolute URL
  const linkDynamicElement = document.createElement('a');
  linkDynamicElement.href = fragmentUrl;
  linkDynamicElement.textContent = fragmentUrl;

  const contentRow = [linkDynamicElement];

  // Create the table structure
  const tableData = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}