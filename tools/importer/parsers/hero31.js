export default function parse(element, { document }) {
  // Extract the image element dynamically
  const imgElement = element.querySelector('picture img');
  const imageClone = imgElement ? imgElement.cloneNode(true) : document.createTextNode('');

  // Extract the heading dynamically
  const headingElement = element.querySelector('h2');
  const headingClone = headingElement ? headingElement.cloneNode(true) : document.createTextNode('');

  // Extract the paragraph dynamically
  const paragraphElement = element.querySelector('p');
  const paragraphClone = paragraphElement ? paragraphElement.cloneNode(true) : document.createTextNode('');

  // Create the header row for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Create the content row for the table
  const contentRow = [
    [imageClone, headingClone, paragraphClone] // Includes image, heading, and paragraph content
  ];

  // Generate the table using the helper function
  const table = WebImporter.DOMUtils.createTable(
    [headerRow, contentRow],
    document
  );

  // Replace the original element with the newly created table
  element.replaceWith(table);
}