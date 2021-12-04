import {
    TrashIcon
} from "@heroicons/react/outline";
function NewLinkEdit() {
    return (
        <>
            {/* <div className="bg-white border rounded-lg border-gray-300"  />
            <div className="w-40 h-10 bg-white border rounded-lg border-gray-300" />
            <img className="w-6 h-6" src="https://via.placeholder.com/24x24" />
            <p className="text-xs">Link’s title*</p>
            <p className="text-xs">Link’s URL*</p>
            <p className="text-xs text-gray-400">Type title here</p>
            <p className="text-xs text-gray-400">Type URL here</p> */}

            <div className="grid grid-cols-7 gap-4 bg-white border rounded-lg border-gray-300 p-4 ">

                <div className="col-span-1 text-center ">
                    <p className="text-lg inline-block">Title</p>

                </div>

                <div className="col-span-2 ">
                    <input
                        className=" overflow-ellipsis overflow-hidden sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md mb-1"
                        type="text"
                        required
                        placeholder="Type title here"
                    />

                </div>



                <div className="col-span-1  text-center ">
                    <p className="text-lg inline-block">URL</p>

                </div>

                <div className="col-span-2 space-x-2">
                    <input
                        className=" overflow-ellipsis overflow-hidden sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md mb-1"
                        type="text"
                        required
                        placeholder="Type URL here"
                    />

                </div>




                <div className="col-span-1 px-8">
                    <TrashIcon className="h-8" />

                </div>

            </div>
        </>
    );
}

export default NewLinkEdit;