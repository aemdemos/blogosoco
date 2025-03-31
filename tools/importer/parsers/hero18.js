export default function parse(element, { document }) {
  // Helper function to extract quote card details
  const extractQuoteCardDetails = (quoteCard) => {
    const quoteText = quoteCard.querySelector('p')?.textContent?.trim() || '';
    const aphorist = quoteCard.querySelector('.aphorist');

    const image = aphorist?.querySelector('img');
    const imageElement = document.createElement('img');
    if (image) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
    }

    const ul = aphorist?.querySelector('ul');
    const author = ul?.children[0]?.textContent?.trim() || 'Unknown Author';
    const place = ul?.children[1]?.textContent?.trim() || 'Unknown Location';

    return {
      quoteText,
      image: imageElement,
      author,
      place
    };
  };

  // Extract all quote cards
  const quoteCards = Array.from(element.querySelectorAll('.quotecard'));

  // Process each quote card
  const quoteCardBlocks = quoteCards.map((quoteCard) => {
    const { quoteText, image, author, place } = extractQuoteCardDetails(quoteCard);

    const quoteParagraph = document.createElement('p');
    quoteParagraph.textContent = quoteText;

    const authorParagraph = document.createElement('p');
    authorParagraph.textContent = `${author}, ${place}`;

    return [quoteParagraph, image, authorParagraph];
  });

  // Prepare table data
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote Carousel';
  const headerRow = [headerCell];

  const cells = [
    headerRow,
    ...quoteCardBlocks.map((block) => [block])
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}