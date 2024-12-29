import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Search({ onSearch }) {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="container mt-3">
      <div className="row g-3 mt-2">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search a book by title, authors or category"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-secondary btn-block">Search</button>
        </div>
      </div>
    </div>
  );
}

export default Search;
