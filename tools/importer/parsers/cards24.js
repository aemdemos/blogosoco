export default function parse(element, { document }) {
  // Critical Review Process:
  // Dynamically extract content from the given element and verify handling of edge cases.

  // Extract the 'Load More Recipes' button from within the given element.
  const button = element.querySelector('a');

  // Edge case handling - Check if the button exists and has content.
  if (!button || !button.textContent.trim()) {
    console.error('Button not found or empty');
    return;
  }

  // Create the header row for the block table.
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards'; // Matches the example header "Cards".

  // Create the content row dynamically for the button.
  const buttonRow = [
    button.cloneNode(true) // Clone button to include all attributes and content.
  ];

  // Validate clone operation.
  if (!buttonRow[0].getAttribute('href') || !buttonRow[0].textContent.trim()) {
    console.error('Cloned button invalid or missing attributes/content.');
    return;
  }

  // Create the block table using the provided helper function.
  const block = WebImporter.DOMUtils.createTable([headerRow, buttonRow], document);

  // Replace the original element with the block table.
  element.replaceWith(block);
}