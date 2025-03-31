export default function parse(element, { document }) {
  const cells = [];

  // Header Row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  cells.push(headerRow);

  // Process Buy Online Button
  const buyOnlineContainer = element.querySelector('.buy-link');
  if (buyOnlineContainer) {
    const buyOnlineLink = buyOnlineContainer.querySelector('a');
    const buyOnlineImage = buyOnlineContainer.querySelector('.buy-link-image span.icon');

    const buyOnlineContent = [];
    if (buyOnlineLink) buyOnlineContent.push(buyOnlineLink.cloneNode(true));
    if (buyOnlineImage) buyOnlineContent.push(buyOnlineImage.cloneNode(true));

    if (buyOnlineContent.length > 0) {
      cells.push([buyOnlineContent]);
    }
  }

  // Process Product Locator Button
  const locatorContainer = element.querySelector('.locator-link');
  if (locatorContainer) {
    const locatorLink = locatorContainer.querySelector('a');
    const locatorImage = locatorContainer.querySelector('.locator-link-image picture');

    const locatorContent = [];
    if (locatorLink) locatorContent.push(locatorLink.cloneNode(true));
    if (locatorImage) locatorContent.push(locatorImage.cloneNode(true));

    if (locatorContent.length > 0) {
      cells.push([locatorContent]);
    }
  }

  // Create Table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace Original Element
  element.replaceWith(table);
}