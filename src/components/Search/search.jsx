import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Search({ onSearch }) {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div class="container mt-3">
      <div class="row g-3 mt-2">
        <div class="col-md-6">
          <input
            type="text"
            class="form-control"
            placeholder="Search a book by title,authors or catagory"
            onChange={handleChange}
          />
        </div>
        <div class="col-md-3">
          <button class="btn btn-secondary btn-block">Search</button>
        </div>
      </div>
    </div>
  );
}

export default Search;
