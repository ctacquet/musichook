/*
import useInfiniteScroll from 'react-infinite-scroll-hook';
import {useState} from "react";
import {List, ListItem} from "@material-ui/core";

function InfiniteList({}) {
    const [items, setItems] = useState([]);
    const [hasNextPage, setHasNextPage] = useState();
    const [loading, setLoading] = useState(false);


    /// ...

    function handleLoadMore() {
        setLoading(true);
        // Some API call to fetch the next page
        loadNextPage(endCursor, pageSize).then((newPage) => {
            setLoading(false);
            setHasNextPage(newPage.hasNextPage);
            setItems([...items, newPage.items]);
        });
    }

    const infiniteRef = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: handleLoadMore,
        scrollContainer,
    });

    // ...

    return (
        <List ref={infiniteRef}>
            {items.map((item) => (
                <ListItem key={item.key}>{item.value}</ListItem>
            ))}
            {loading && <ListItem>Loading...</ListItem>}
        </List>
    );
}*/
