export default function parse(element, { document }) {
  // Create the header row for the table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Extract the image element from the provided HTML
  const image = element.querySelector('img');

  // Ensure the image is properly extracted or handle edge cases
  const contentRow = image ? [image.cloneNode(true)] : ['No image available'];

  // Create the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}