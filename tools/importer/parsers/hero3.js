export default function parse(element, { document }) {
  // Extract relevant parts of the input element
  const logoSvg = element.querySelector('.agegate-logo .icon-logo-agegate svg');
  const heading = element.querySelector('#are-you-over-21');
  const buttons = Array.from(element.querySelectorAll('.agegate-button-wrap .agegate-button'));

  // Create content elements
  const svgWrapper = document.createElement('div');
  if (logoSvg) {
    svgWrapper.appendChild(logoSvg.cloneNode(true));
  }

  const headingElement = document.createElement('h1');
  headingElement.textContent = heading ? heading.textContent.trim() : '';

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-wrapper';
  buttons.forEach((button) => {
    const newButton = document.createElement('a');
    newButton.href = button.href;
    newButton.textContent = button.textContent.trim();
    buttonContainer.appendChild(newButton);
  });

  // Create the header row EXACTLY as specified in the example
  const headerRow = ['Hero'];

  // Create table structure
  const cells = [
    headerRow,
    [[svgWrapper, headingElement, buttonContainer]]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}