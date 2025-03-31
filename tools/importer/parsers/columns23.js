export default function parse(element, { document }) {
  // Prepare the header row with the block name
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Extract the image inside the element
  const pictureElement = element.querySelector('picture');
  const image = pictureElement ? pictureElement.querySelector('img') : null;

  // Ensure we handle edge cases for missing image
  const tableDataRow = [image || document.createTextNode('Image not found')];

  // Structure the table cells
  const cells = [
    headerRow, // Header row
    tableDataRow, // Data row
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}