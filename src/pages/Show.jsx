import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getShowById } from '../api/tvmaze';
import { useQuery } from '@tanstack/react-query'
import ShowMainData from '../Components/shows/ShowMainData';
import Details from '../Components/shows/Details';
import Seasons from '../Components/shows/Seasons';
import Cast from '../Components/shows/Cast';

// The commented code is optimized using Data fetching libraries like 'Tanstack Query' etc.
// We can also use '<react.StrictMode> </react.StrictMode>' tag now.
// const useShowById = (showId) => {
//     const [showData, setShowData] = useState(null);
//     const [showError, setShowError] = useState(null);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const data = await getShowById(showId);
//                 setShowData(data);
//             } catch (err) {
//                 setShowError(err);
//             }
//         }
//         fetchData();
//     }, [showId])
//     return { showData, showError };

// }

const Show = () => {
    const { showId } = useParams();
    // const { showData, showError } = useShowById(showId);
    const { data: showData, error: showError } = useQuery({
        queryKey: ['show', showId],
        queryFn: () => getShowById(showId),
        refetchOnWindowFocus: false
    })


    if (showError) {
        return <div>We have an error: {showError.message}</div>
    }
    if (showData) {
        return <div>

            <Link to="/">Go back to Home</Link>


            <ShowMainData image={showData.image} name={showData.name} rating={showData.rating} summary={showData.summary} genres={showData.genres} />
            <div>
                <h2>Details</h2>
                <Details
                    status={showData.status}
                    premiered={showData.premiered}
                    network={showData.network}
                />
            </div>

            <div>
                <h2>Seasons</h2>
                <Seasons seasons={showData._embedded.seasons} />
            </div>
            <div>
                <h2>Cast</h2>
                <Cast cast={showData._embedded.cast} />
            </div>
        </div>
    }

    return <div>Data is loading.</div>
}
export default Show;