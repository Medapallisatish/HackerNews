import "./index.css";
import { Component } from "react";
import { FiSearch } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import Content from "../Content";

class Header extends Component {
    constructor(props) {
        super(props);
    this.state = {
        ItemList: [],
        currentPage: 0,
        itemsPerPage: 10,
        query: "" ,
        searchCriteria: "title"// Number of items to display per page
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);

}
    componentDidMount() {
        this.getDetails();
        const params= new URLSearchParams(window.location.search);
        const query=params.get('query') || '';
        this.setState({query}, () => this.getDetails(query))
    }

    getDetails = async (query="") => {
        try {
            const dataFetch = await fetch(`http://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}`);
            const jsonData = await dataFetch.json();
            const ItemList = jsonData.hits;
            console.log(ItemList); // Ensure data is fetched correctly
            this.setState({ ItemList, currentpage:0 });
            window.history.pushState(null, "", `?query=${encodeURIComponent(query)}`)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    handleNextPage = () => {
        const { currentPage, ItemList, itemsPerPage } = this.state;
        const totalPages = Math.ceil(ItemList.length / itemsPerPage);
        if (currentPage < totalPages - 1) {
            this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }));
        }
    };

    handlePrevPage = () => {
        this.setState((prevState) => ({ currentPage: Math.max(prevState.currentPage - 1, 0) }));
    };

    handleSearchChange=(e)=>{
        this.setState({query:e.target.value})
    }

 
    handleSearchSubmit=(e)=>{
        e.preventDefault();
        this.getDetails(this.state.query)
    }

    render() {
        const { ItemList, currentPage, itemsPerPage,query,searchCriteria } = this.state;
        const totalPages = Math.ceil(ItemList.length / itemsPerPage);

        // Calculate the index of the first and last items to display
        const indexOfLastItem = (currentPage + 1) * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        // Get the items to display on the current page
        const currentItems = ItemList.slice(indexOfFirstItem, indexOfLastItem);

        return (
            <>



                <div className="header-container">
                    <span className="logo">
                        <a href="https://news.ycombinator.com/">
                            <img src="https://hn.algolia.com/public/899d76bbc312122ee66aaaff7f933d13.png" alt="logo-image" className="logo-image" />
                        </a>
                        <div className="title-container">
                            <a href="/" className="ref">
                                <div className="title">
                                    Search
                                    <br />
                                    Hacker News
                                </div>
                            </a>
                        </div>
                    </span>



                    <form onSubmit={this.handleSearchSubmit} className="box">
                    <>
                        <FiSearch className="search-icon" />
                        <input value = {query} type="text" className="search-input" placeholder="Search stories by title, url or author" onChange={this.handleSearchChange}/>
                        <div className="poweredby">
                            <span className="span">Search by</span>
                            <a href="https://www.algolia.com/developers/?utm_source=hackernews&utm_medium=referral">
                                <img src="https://hn.algolia.com/public/38a9c67b12016b52267071c530ff2e78.svg" alt="blue-image" className="blue-image" />
                            </a>
                        </div>
                    </>
                    </form>
                    <IoSettingsSharp className="setting" />
                </div>

<div className="filter">



<span>Search</span>
<select value={searchCriteria} onChange={this.handleCriteriaChange} className="search-dropdown">
                                <option value="title">All</option>
                                <option value="url">Stories</option>
                                <option value="author">Comments</option>
                                <option value="hn">Ask HN</option>
                                <option value="show">Show HN</option>
                                <option value="launch">Launch HN</option>
                                <option value="value">Jobs</option>
                                <option value="polls">Polls</option>
                                </select>

                                <span>by</span>

                                <select value={searchCriteria} onChange={this.handleCriteriaChange} className="search-dropdown">
                                <option value="title">Popularity</option>
                                <option value="url">Date</option>
                                </select>
<span>for</span>

<select value={searchCriteria} onChange={this.handleCriteriaChange} className="search-dropdown">
                                <option value="title">All Time</option>
                                <option value="url">Last 24h</option>
                                <option value="url">Past Week</option>
                                <option value="url">Past Month</option>
                                <option value="url">Past Year</option>
                                <option value="url">Custom Range</option>
                                
                                </select>


                                </div>

                {/* Render current items */}
                {currentItems.map((eachData) => (
                    <Content key={eachData.objectID} Details={eachData} />
                ))}


                {/* Pagination Controls */}
                <div className="pagination">
                    <button onClick={this.handlePrevPage} disabled={currentPage === 0}>&laquo;</button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={currentPage === index ? "active" : ""}
                            onClick={() => this.setState({ currentPage: index })}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={this.handleNextPage} disabled={currentPage >= totalPages - 1}>&raquo;</button>
                </div>

                <div className="foot">
                About
•
Setting
•
Help
•
API Documentation
•
Hacker News
•
Fork/Contribute
•
Cool Apps
                </div>
            </>
        );
    }
}

export default Header;
