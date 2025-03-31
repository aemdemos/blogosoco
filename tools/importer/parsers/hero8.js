export default function parse(element, { document }) {
  // Ensure dynamic extraction of title
  const titleElement = element.querySelector('h1');
  const title = document.createElement('h1');
  title.textContent = titleElement ? titleElement.textContent : '';

  // Ensure dynamic extraction of image attributes
  const imageElement = element.querySelector('picture img');
  const image = document.createElement('img');
  if (imageElement) {
    image.setAttribute('src', imageElement.getAttribute('src'));
    image.setAttribute('alt', imageElement.getAttribute('alt'));
  }

  // Confirm table header matches example exactly
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Ensure the content row dynamically combines extracted elements
  const contentRow = [
    [image, title]
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}