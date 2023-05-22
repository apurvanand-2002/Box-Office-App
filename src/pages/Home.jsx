import { useState } from 'react';
import { searchForShows, searchForPeople } from './../api/tvmaze';
import SearchForm from '../Components/SearchForm';
import ShowGrid from '../Components/shows/ShowGrid';
import ActorsGrid from '../Components/actors/ActorsGrid';

const Home = () => {
    const [apiData, setApiData] = useState(null);
    const [apiDataError, setApiDataError] = useState(null);



    const onSearch = async ({ q, searchOption }) => {

        try {
            setApiDataError(null);
            let result;
            if (searchOption === 'shows') {
                result = await searchForShows(q);
            } else {
                result = await searchForPeople(q);
            }
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
    };

    const renderApiData = () => {
        if (apiDataError) {
            return <div>Error occured: {apiDataError.message}</div>;
        }
        if (apiData?.length == 0) {
            return <div>No results available.</div>
        }
        if (apiData) {
            return apiData[0].show ? <ShowGrid shows={apiData} /> : <ActorsGrid actors={apiData} />;
        }
        return null;
        // {
        //     apiData.map(data => <div key={data.show.id}>{data.show.name}</div>)
        // }
    };
    return (
        <div>
            <SearchForm onSearch={onSearch} />

            <div>{renderApiData()}</div>
        </div>
    );
};
export default Home;
