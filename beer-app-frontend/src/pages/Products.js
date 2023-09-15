import React from "react";
import styles from "../assets/styles/Product.module.css";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";

export function Products() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 16;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = data
    .sort((a, b) => {
      return a.manufacturer.localeCompare(b.manufacturer);
    })
    .slice(startIndex, endIndex);

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/products");
      setData(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/beerdetails/${e.target.parentNode.getAttribute("productid")}`);
  };

  return data ? (
    <div className={styles.mainContainer}>
      {error ? (
        <h1>Something went wrong!</h1>
      ) : (
        <>
          <h1>Products</h1>
          <div className={styles.flexContainer}>
            {subset.map((item, index) => (
              <Link to="/beerdetails">
                {error ? (
                  <h3>Something went wrong!</h3>
                ) : (
                  <div
                    className={styles.itemContainer}
                    key={index}
                    productid={item._id}
                    onClick={handleClick}
                  >
                    <img
                      src={item.imageLink}
                      alt="beer"
                      className={styles.image}
                    />
                    <div className={styles.overlay}>
                      <p className={styles.info}>{item.name}</p>
                      <p className={styles.info}>{`Price: ${item.price}€`}</p>
                      <p className={styles.info}>{`Type: ${item.type}`}</p>
                    </div>
                    <p className={styles.name}>{item.name}</p>
                  </div>
                )}
              </Link>
            ))}
          </div>
          <ReactPaginate
            pageCount={totalPages}
            onPageChange={handlePageChange}
            forcePage={currentPage}
            previousLabel={"<<"}
            nextLabel={">>"}
            containerClassName={styles.paginateContainer}
            pageClassName={styles.paginatePage}
            pageLinkClassName={styles.paginatePageLink}
            previousClassName={styles.paginatePrevious}
            nextClassName={styles.paginateNext}
            activeClassName={styles.paginateActivePage}
          />
        </>
      )}
    </div>
  ) : (
    <div className={styles.mainContainer}>
      <ProgressBar
        borderColor="#1B1A17"
        barColor="#E45826"
        height="150"
        width="150"
      />
    </div>
  );
}
