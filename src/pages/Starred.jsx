import { useQuery } from "@tanstack/react-query";
import { useStarredShows } from "../lib/useStarredShows";
import { getShowsByIds } from "../api/tvmaze";
import ShowGrid from "../Components/shows/ShowGrid";

const Starred = () => {
    const [starredShowsIds] = useStarredShows();
    //starred shows
    const { data: starredShows, error: starredShowsError } = useQuery({
        queryKey: ['starred', starredShowsIds],
        queryFn: async () => getShowsByIds(starredShowsIds).then(result => result.map(show => ({ show }))),
        refetchOnWindowFocus: false,
    })

    if (starredShows && starredShows.length === 0) {
        return <div>No shows were starred.</div>
    }
    if (starredShows && starredShows.length > 0) {
        return <ShowGrid shows={starredShows} />
    }
    if (starredShowsError) {
        return <div>Error occured: {starredShowsError.message}</div>
    }

    return <div>Shows are being loaded...</div>;
};
export default Starred;
