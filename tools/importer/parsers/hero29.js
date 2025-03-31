export default function parse(element, { document }) {
  // Critical Fix Applied: Removed the return statement

  // Header Row: Use a bold label "Hero"
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Extract Background Image
  const imageElement = element.querySelector('.agegate-image img');
  let image = null;
  if (imageElement && imageElement.src) {
    image = document.createElement('img');
    image.src = imageElement.src;
  }

  // Extract Title from the "Are you over 21?" header
  const titleElement = element.querySelector('.verification h1');
  let title = null;
  if (titleElement) {
    title = document.createElement('h1');
    title.textContent = titleElement.textContent;
  }

  // Extract Call-to-Action Buttons (Yes/No)
  const buttonsElement = element.querySelectorAll('.verification .agegate-button-wrap a');
  const buttons = Array.from(buttonsElement).map((button) => {
    const cta = document.createElement('a');
    cta.href = button.href;
    cta.textContent = button.textContent;
    return cta;
  });

  // Construct Table Rows
  const cells = [
    headerRow, // Header row defining the block type
    [
      // Ensure all extracted elements are added dynamically
      image || '',
      title || '',
      buttons.length > 0 ? buttons : '', // Ensure empty cells for missing buttons
    ],
  ];

  // Create block table using helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}