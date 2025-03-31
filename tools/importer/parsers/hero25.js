export default function parse(element, { document }) {
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Hero';

    // Dynamically extract the first image (background image)
    const backgroundPicture = element.querySelector('picture img');
    const backgroundImage = backgroundPicture ? backgroundPicture.src : null;
    const altText = backgroundPicture ? backgroundPicture.alt : '';

    // Dynamically extract the headline
    const headline = element.querySelector('h2');
    const headlineText = headline ? headline.textContent.trim() : '';

    const contentCell = [];

    // Add the background image element if it exists
    if (backgroundImage) {
        const imageElement = document.createElement('img');
        imageElement.src = backgroundImage;
        imageElement.alt = altText;
        contentCell.push(imageElement);
    }

    // Add the headline element if it exists
    if (headlineText) {
        const headingElement = document.createElement('h1');
        headingElement.textContent = headlineText;
        contentCell.push(headingElement);
    }

    const tableData = [
        headerRow,
        [contentCell]
    ];

    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(blockTable);
}