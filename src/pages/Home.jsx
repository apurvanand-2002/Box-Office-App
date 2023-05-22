import { useState } from "react";
import { searchForShows } from "./../api/tvmaze"

const Home = () => {
    const [searchStr, setsearchStr] = useState("");
    const [apiData, setApiData] = useState(null);
    const [apiDataError, setApiDataError] = useState(null);
    console.log(apiDataError)

    const onSearchInputChange = (ev) => {
        setsearchStr(ev.target.value);
    }
    const onSearch = async (ev) => {
        ev.preventDefault();
        try {
            setApiDataError(null);
            const result = await searchForShows(searchStr);
            setApiData(result);
        } catch (error) {
            setApiDataError(error);
        }

        //searchForShows(searchStr)
        // const body = await apiGet(`/search/shows?q=${searchStr}`);

        // const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchStr}`)
        // const body = await response.json();
        // console.log(body);
        // // https://api.tvmaze.com/search/shows?q=boys

    }

    const renderApiData = () => {
        if (apiDataError) {
            return <div>Error occured: {apiDataError.message}</div>;
        }
        if (apiData) {
            return apiData.map(data => <div key={data.show.id}>{data.show.name}</div>)
        }
        return null;
        // {
        //     apiData.map(data => <div key={data.show.id}>{data.show.name}</div>)
        // }
    }
    return (<div>
        <form onSubmit={onSearch}>
            <input type="text" value={searchStr} onChange={onSearchInputChange} />
            <button type="submit">Search</button>
        </form>

        <div>
            {renderApiData()}

        </div>
    </div>)
}
export default Home;