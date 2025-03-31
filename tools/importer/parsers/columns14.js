export default function parse(element, { document }) {
  // Helper function to create content arrays for table rows
  const createStepContent = (stepElement) => {
    const stepNumberElement = stepElement.querySelector('.step span');
    const stepNumber = stepNumberElement ? stepNumberElement.textContent : '';

    const titleElement = stepElement.querySelector('p:nth-of-type(1)');
    const titleText = titleElement ? titleElement.textContent : '';

    const descriptionElement = stepElement.querySelector('p:nth-of-type(2)');
    const descriptionText = descriptionElement ? descriptionElement.textContent : '';

    const titleNode = document.createElement('strong');
    titleNode.textContent = `${stepNumber}: ${titleText}`;

    const descriptionNode = document.createElement('p');
    descriptionNode.textContent = descriptionText;

    return [titleNode, descriptionNode];
  };

  const stepsWrapper = element.querySelector('.steps-wrapper');
  if (!stepsWrapper) return;

  const steps = stepsWrapper.querySelectorAll('.steps > div');

  // Correcting the header row to match the example exactly
  const headerRow = [
    document.createElement('th')
  ];
  const headerStrong = document.createElement('strong');
  headerStrong.textContent = 'Steps';
  headerRow[0].appendChild(headerStrong);

  const rows = [
    headerRow,
  ];

  steps.forEach((step) => {
    if (!step.querySelector('.step span') || !step.querySelector('p:nth-of-type(1)') || !step.querySelector('p:nth-of-type(2)')) {
      return; // Skip missing or incomplete steps
    }
    const stepContent = createStepContent(step);
    rows.push([stepContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}