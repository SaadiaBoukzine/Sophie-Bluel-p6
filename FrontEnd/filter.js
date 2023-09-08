const createFilters = ({ worksData, onSelectFilter }) => {
    const filters = document.querySelectorAll(".filter-button");
  
    filters.forEach((filter) => {
      filter.addEventListener("click", () => {
        const filterName = filter.getAttribute("data-id");
        const filteredWorks = worksData.filter((work) =>
          filterName === "All" ? work : work.category.name === filterName
        );
        onSelectFilter(filteredWorks);
      });
    });
  
    return {};
  };
  
  export default createFilters;