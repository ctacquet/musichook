import { algoliasearch } from 'algoliasearch/lite';
import {
  SearchBox,
  Hits,
  InstantSearch,
} from 'react-instantsearch-dom';
import Hit from "./Hit";

const searchClient = algoliasearch("GQOSKB9P5P", "3534601df5769241e2f380c6a929f25c");

function AlgoliaSearch() {

    const TheHit = ({ hit, onClick }) => {
        return <Hit hit={hit} onClick={console.log} />;
    }

    return (
        <InstantSearch indexName="users" searchClient={searchClient}>
          <div className="right-panel">
            <SearchBox />
            <Hits hitComponent={TheHit} />
          </div>
        </InstantSearch>
    )
}

export default AlgoliaSearch
