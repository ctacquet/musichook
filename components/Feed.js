import Posts from "./Posts";
import { Tab } from '@headlessui/react';
import { CogIcon } from "@heroicons/react/outline";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function TabList({text, key}) {
    return (
        <Tab
        key={key}
        className={({ selected }) =>
            classNames(
            'w-full py-2.5 text-sm leading-5text-black dark:text-white rounded-lg border dark:border-opacity-20',
            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60',
            selected
                ? 'bg-gray-100 font-bold dark:bg-white dark:bg-opacity-20 dark:border-opacity-5 shadow text-purple-700 dark:text-purple-500'
                : 'hover:bg-black/[0.12] hover:text-black dark:hover:bg-white/[0.12] dark:hover:text-white'
            )
        } >
            {text}
        </Tab>
    );
}

function TabPanel({children, key}) {
    return (
        <Tab.Panel
        key={key}
        className={classNames(
            '',
            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-purple-400 ring-white ring-opacity-60'
        )}
        >
            {children}
        </Tab.Panel>
    );
}

function Feed() {
    return (
        <section className="col-span-2">
            <Tab.Group>
                <Tab.List className="sticky top-20 z-10 mt-7 flex p-1 space-x-1 bg-white dark:bg-black border dark:border-opacity-20 rounded-xl">
                    <TabList text={"All posts"} key="1" />
                    <TabList text={"Your feed"} key="2" />
                </Tab.List>
                <Tab.Panels>
                    <TabPanel key="1">
                        <Posts />
                    </TabPanel>
                    <TabPanel key="2">
                        <div
                            className="mx-2 md:mx-8 lg:mx-12 xl:mx-18 flex bg-yellow-100 dark:bg-yellow-600 rounded-lg p-4 m-4 text-sm text-yellow-700 dark:text-white"
                            role="alert"
                        >
                            <CogIcon className="h-6 w-6 animate-spin-slow" />
                            <div className="pl-2 w-full translate-y-0.5">
                            <span className="font-bold pr-2">Under Construction!</span> 
                            <p className="inline">You will soon see here a custom feed based on users you are following.</p>
                            </div>
                        </div>
                    </TabPanel>
                </Tab.Panels>
            </Tab.Group>
        </section>
    )
}

export default Feed