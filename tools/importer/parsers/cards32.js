export default function parse(element, { document }) {
  // Extract recipes from the given element
  const recipes = element.querySelectorAll('.recipe');

  // Prepare the header row for the table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';

  // Prepare the rows for each recipe card
  const rows = Array.from(recipes).map(recipe => {
    const image = recipe.querySelector('.recipe-image img');
    const title = recipe.querySelector('span');

    // Create image element
    const imgElement = document.createElement('img');
    if (image?.src) {
      imgElement.src = image.src;
    }
    imgElement.alt = image?.alt || '';

    // Create title element
    const titleElement = document.createElement('strong');
    titleElement.textContent = title?.textContent || '';

    // Return a row with the image and title
    return [imgElement, titleElement];
  });

  // Combine header and rows into the table
  const tableContent = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}