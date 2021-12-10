import Link from "next/link";

export function Hit({hit}){
    return(
        <div className="flex flex-col border w-32 h-12">
            <header>
                <div className="">{hit.username}</div>
            </header>
            <section>
                <Link href={`/profiles/${hit.uid}`}>
                <a classname="italic">Click for details</a>
                </Link>
            </section>
        </div>
    )
}