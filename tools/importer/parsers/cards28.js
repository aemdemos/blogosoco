export default function parse(element, { document }) {
  const tableData = [];

  // Create header row matching the example
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  tableData.push(headerRow);

  // Extract featured recipes dynamically
  const recipes = element.querySelectorAll('.featured-recipe');
  recipes.forEach((recipe) => {
    const link = recipe.querySelector('a');
    const image = recipe.querySelector('img');
    const titleSpan = recipe.querySelector('span');

    // Handle missing or empty elements gracefully
    const imageElement = document.createElement('img');
    imageElement.src = image ? image.src : '';
    imageElement.alt = titleSpan ? titleSpan.textContent : '';

    const textContent = document.createElement('div');
    if (titleSpan) {
      const title = document.createElement('h3');
      title.textContent = titleSpan.textContent;
      textContent.appendChild(title);
    }

    if (link) {
      const cta = document.createElement('a');
      cta.href = link.href;
      cta.textContent = 'View More';
      textContent.appendChild(cta);
    }

    tableData.push([imageElement, textContent]);
  });

  // Create table block
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table block
  element.replaceWith(tableBlock);
}