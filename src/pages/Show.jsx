import { useParams } from 'react-router-dom';

const Show = () => {
    const { showId } = useParams();

    return <div>SHOW PAGE for show {showId}</div>
}
export default Show;