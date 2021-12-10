export function Hit({hit, onClick}){
    return(
        <div className="">
            <header>
                <div className="">{hit.username}</div>
            </header>
            <section>
                <button onClick={() => onClick(hit)}>Details</button>
            </section>
        </div>
    )
}