export default function parse(element, { document }) {
  // Dynamically extract the URL from the provided element
  const socialLinks = element.querySelectorAll('.footer-social a[href]');
  let extractedLink = '';

  // Loop through social links and extract one with the most relevance, prioritize Facebook (example)
  socialLinks.forEach(link => {
    if (link.href.includes('facebook.com')) {
      extractedLink = link.href;
    }
  });

  // Create header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Fragment';
  const headerRow = [headerCell];

  // Create content row dynamically
  const contentRow = [document.createElement('a')];
  if (extractedLink) {
    contentRow[0].href = extractedLink;
    contentRow[0].textContent = extractedLink;
  } else {
    contentRow[0].textContent = 'No relevant URL found';
  }

  // Create table
  const cells = [
    headerRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}