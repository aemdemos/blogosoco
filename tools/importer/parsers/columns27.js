export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const contentRow1 = [];

  // Extract the first image
  const imageContainer = element.querySelector('.agegate-image picture');
  const image = imageContainer?.querySelector('img');

  if (image) {
    const imageClone = image.cloneNode(true);
    contentRow1.push(imageClone);
  }

  // Extract text content and list items dynamically
  const textContainer = document.createElement('div');

  const listItems = element.querySelectorAll('.verification h1, .verification .agegate-button-wrap a');
  if (listItems.length > 0) {
    const list = document.createElement('ul');
    listItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.textContent;
      list.appendChild(li);
    });
    textContainer.appendChild(list);
  }

  const liveLink = element.querySelector('.verification .agegate-button-wrap a[href="/"]');
  if (liveLink) {
    const liveLinkClone = liveLink.cloneNode(true);
    textContainer.appendChild(liveLinkClone);
  }

  contentRow1.push(textContainer);

  // Extract the second image
  const contentRow2 = [];
  const secondaryImageContainer = element.querySelector('.hero-wrapper picture');
  const secondaryImage = secondaryImageContainer?.querySelector('img');

  if (secondaryImage) {
    const secondaryImageClone = secondaryImage.cloneNode(true);
    contentRow2.push(secondaryImageClone);
  }

  // Extract dynamic secondary text and link
  const secondaryTextContainer = document.createElement('div');

  const rejectionText = element.querySelector('.rejection h3');
  if (rejectionText) {
    secondaryTextContainer.textContent = rejectionText.textContent;
  }

  const previewLink = element.querySelector('.rejection a[href="https://www.responsibility.org/"]');
  if (previewLink) {
    const previewLinkClone = previewLink.cloneNode(true);
    secondaryTextContainer.appendChild(previewLinkClone);
  }

  contentRow2.push(secondaryTextContainer);

  // Create the table
  const tableData = [
    headerRow,
    contentRow1,
    contentRow2
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}