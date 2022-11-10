import { useState, MouseEvent } from "react"

interface StoreType {
    name: string;
    description: string;
    logo: string;
    primaryColor: string;
}

export default function OpenStoreForm() {
    const [store, setStore] = useState<StoreType>();

    const createStore = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        console.log(store);

    }

    return (
        <div>

            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-violet-700 sm:text-3xl">
                        Get started today
                    </h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Open a store with hyperstore to and take your business to the moon 🚀
                    </p>

                    <form action="" className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">


                        <div>
                            <label htmlFor="name" className="text-sm font-medium">Store name *</label>

                            <div className="relative mt-1">
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter store name"
                                    onChange={(e) => {
                                        setStore((prev: any) => {
                                            return { ...prev, name: e.target.value }
                                        })
                                    }}
                                />


                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="text-sm font-medium">Description</label>

                            <div className="relative mt-1">
                                <input
                                    type="description"
                                    id="description"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Enter a short description for your store"
                                    onChange={(e) => {
                                        setStore((prev: any) => {
                                            return { ...prev, description: e.target.value }
                                        })
                                    }}
                                />


                            </div>
                        </div>

                        <div>
                            <label htmlFor="logo" className="text-sm font-medium">Logo</label>
                            <div className="relative mt-1">
                                <input
                                    type="file"
                                    id="logo"
                                    className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                                    placeholder="Upload business logo"
                                    onChange={(e) => {
                                        setStore((prev: any) => {
                                            const target = e.target as HTMLInputElement;
                                            const image: File = (target.files as FileList)[0];
                                            return { ...prev, logo: image }
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="primaryColor" className="text-sm font-medium">Brand color</label>

                            <div className="relative mt-1">
                                <input
                                    type="color"
                                    id="primaryColor"
                                    placeholder="Pick a brand color"
                                    onChange={(e) => {
                                        setStore((prev: any) => {
                                            return { ...prev, primaryColor: e.target.value }
                                        })
                                    }}
                                />


                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-violet-700 px-5 py-3 text-sm font-medium text-white"
                            onClick={createStore}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}
