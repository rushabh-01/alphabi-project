import React, { useState,useEffect } from "react";
import Gif from "./Gif";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const [gifData, setgifData] = useState([]);
  const [loading, setLoading] = useState(false); 
  console.log(process.env.API_KEY)

  // handling search

  const handleSearch = async () => {
    // e.preventDefault();
    console.log(query);

    const api_key = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}`;

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setgifData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    handleSearch();
  };


  // pagination calculation

  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(gifData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = gifData.slice(startIndex, endIndex);



  // stop user navigate back to login page on hitting back button in browser if user is already logged in

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  const handlePopstate = (event) => {
    if (window.location.pathname === '/login') {history
      window.history.go(-1);
    }
  };


  const [mobile, setMobile] = useState(true);
  useEffect(() => {
    window.innerWidth <= 768 ? setMobile(true) : setMobile(false);
  }, [mobile]);
  

  return (
    <>
      <main className="search-container">
        
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            name="search"
            placeholder="Search Gifs"
          />
          <button onClick={handleSearch} type="submit" className="search-btn">
            Search
          </button>
      </main>
      {loading ? (
        <div className="spinner-container">
        <div className="spinner"></div>
      </div>
      ) 
      : 
      gifData.length > 0 ? (
        <Row className="justify-content-md-start" style={{ margin: "auto",height: 400 }}>

          {mobile ?
          gifData.map((result) => (
            <Col lg={4} key={result.id} style={{ padding: 20 }}>
              <Gif key={result.id} result={result} />
            </Col>
          )) 
          :
          currentData.map((result) => (
            <Col lg={4} key={result.id} style={{ padding: 20 }}>
              <Gif key={result.id} result={result} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="no-gifs-container">
          {query ? (
            <h2>No GIFs found</h2>
          ) : (
            <h2>Start your search by entering a keyword above.</h2>
          )}
        </div>
      )}
      {mobile ? '' 
      :
      <div className="pagination-btn">
        <h6
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </h6>
        .....
        <h6
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </h6>
      </div>
      }
      
    </>
  );
}
