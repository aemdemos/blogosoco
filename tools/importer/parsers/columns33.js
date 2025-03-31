export default function parse(element, { document }) {
  // Validate and ensure all data is dynamically extracted

  // 1. Create header row dynamically
  const createHeaderRow = (headerText) => {
    const header = document.createElement('strong');
    header.textContent = headerText;
    return [header];
  };

  // 2. Extract Navigation Brand Name dynamically
  let navBrandText = '';
  const navBrandLink = element.querySelector('.nav-brand a');
  if (navBrandLink) {
    navBrandText = navBrandLink.getAttribute('aria-label') || '';
  }

  // 3. Extract Navigation Links dynamically
  const navigationLinks = [...element.querySelectorAll('.nav-sections .navigation')].map((link) => {
    if (link.href && link.textContent) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      return linkElement;
    }
    return ''; // Handle edge case if link.textContent is missing
  }).filter(Boolean);

  // 4. Extract Social Links dynamically
  const socialLinks = [...element.querySelectorAll('.header-social a')].map((link) => {
    const icon = link.querySelector('svg') ? link.querySelector('svg').cloneNode(true) : null;
    if (link.href && link.title) {
      const socialElement = document.createElement('a');
      socialElement.href = link.href;
      socialElement.title = link.title;
      if (icon) {
        socialElement.appendChild(icon);
      }
      return socialElement;
    }
    return ''; // Handle edge case if data is missing
  }).filter(Boolean);

  // 5. Construct rows dynamically
  const rows = [
    createHeaderRow('Columns'), // Header row matches example structure
    [navBrandText, navigationLinks], // Dynamically extracted navigation data
    [socialLinks],                  // Dynamically extracted social links
  ];

  // 6. Create table block using helper function
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // 7. Replace the original element with the new block table
  element.replaceWith(blockTable);
}