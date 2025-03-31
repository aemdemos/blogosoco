export default function parse(element, { document }) {
  // Create the header row for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Fragment';
  const headerRow = [headerCell];

  // Extract the fragment link dynamically
  const fragmentLinkElement = document.createElement('a');
  fragmentLinkElement.href = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/fragment-include';
  fragmentLinkElement.textContent = fragmentLinkElement.href;

  // Check if the image element exists and handle missing data
  const pictureElement = element.querySelector('picture img');
  let contentElement;
  if (pictureElement) {
    contentElement = pictureElement.cloneNode(true); // Copy the image element
  } else {
    contentElement = document.createTextNode('No image available'); // Fallback text
  }

  // Construct the cells for the table
  const cells = [
    headerRow, // Header row
    [fragmentLinkElement], // Content row with the fragment link
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}