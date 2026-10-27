window.createKitabShareLinks = function (book) {
  const url = new URL(
    `/kitab/detail.html?slug=${encodeURIComponent(book.slug)}`,
    'https://daarulazmi.ponpes.id',
  ).href;
  const shareUrl = encodeURIComponent(url);
  const text = encodeURIComponent(`${book.title} - ${book.category}`);
  const links = [
    {
      label: 'WhatsApp',
      className: 'share-whatsapp',
      url: `https://wa.me/?text=${text}%20${shareUrl}`,
    },
    {
      label: 'Facebook',
      className: 'share-facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
    {
      label: 'X',
      className: 'share-x',
      url: `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
    },
  ];
  const fragment = document.createDocumentFragment();

  links.forEach((link) => {
    const anchor = document.createElement('a');
    anchor.className = `share-btn ${link.className}`;
    anchor.href = link.url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.textContent = link.label;
    anchor.setAttribute('aria-label', `Bagikan ${book.title} lewat ${link.label}`);
    fragment.appendChild(anchor);
  });

  return fragment;
};
