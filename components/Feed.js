import Posts from "./Posts";
import FeedPosts from "./FeedPosts";
import { Tab } from '@headlessui/react';
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function TabList({text}) {
    return (
        <Tab
        className={({ selected }) =>
            classNames(
            'w-full py-2.5 text-sm leading-5 text-black dark:text-white rounded-lg border dark:border-opacity-20',
            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 dark:focus:ring-0 dark:ring-offset-0 ring-white ring-opacity-60',
            selected
                ? 'bg-gray-100 font-bold dark:bg-white dark:bg-opacity-20 dark:border-opacity-5 shadow text-purple-700 dark:text-purple-500'
                : 'hover:bg-black/[0.12] hover:text-black dark:hover:bg-white/[0.12] dark:hover:text-white'
            )
        } >
            {text}
        </Tab>
    );
}

function TabPanel({children}) {
    return (
        <Tab.Panel
        className={classNames(
            ''
        )}
        >
            {children}
        </Tab.Panel>
    );
}

function Feed() {
    const [user] = useAuthState(auth);
    return (
        <section className="col-span-2">
            {user ? (
            <Tab.Group>
                <Tab.List className="sticky top-20 z-20 mt-7 mx-7 lg:mx-0 flex p-1 space-x-1 bg-white dark:bg-black border dark:border-opacity-20 rounded-xl">
                    <TabList text={"All posts"} key={1} />
                    <TabList text={"Your feed"} key={2} />
                </Tab.List>
                <Tab.Panels>
                    <TabPanel key={1}>
                        <Posts />
                    </TabPanel>
                    <TabPanel key={2}>
                        <FeedPosts />
                    </TabPanel>
                </Tab.Panels>
            </Tab.Group>
            ) : (<Posts />)}
        </section>
    )
}

export default Feed