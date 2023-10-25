const paginateData = (items, currentPage) => {
  const ITEMS_PER_PAGE = 20;

  const sliceEnd = currentPage * ITEMS_PER_PAGE;
  const sliceStar = sliceEnd - ITEMS_PER_PAGE;
  const itemsInCurrentPage = items.slice(sliceStar, sliceEnd);

  const lastPage = Math.ceil(items.length / ITEMS_PER_PAGE);

  //! Bloque Actual

  const PAGES_PER_BLOCK = 7;
  const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);

  //? Las paginas que se van a mostrar en el bloque Actual
  const pagesInBlock = [];
  const maxPage = actualBlock * PAGES_PER_BLOCK;
  const minPage = maxPage - PAGES_PER_BLOCK + 1;

  for (let i = minPage; i <= maxPage; i++) {
    if (i <= lastPage) {
      pagesInBlock.push(i);
    }
  }

  return{
    itemsInCurrentPage,
    pagesInBlock,
    lastPage
  }
};

export { paginateData };
