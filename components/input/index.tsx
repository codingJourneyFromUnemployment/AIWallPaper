export default function Input() {
  return (
    <div className="w-11/12 md:w-3/4 md:max-w-7xl flex flex-col space-y-6 md:flex-row md:space-x-6">
      <label htmlFor="prompt" className="sr-only">
        Email
      </label>
      <input
        id="prompt"
        name="prompt"
        type="text"
        placeholder="Input your prompt for a new wallpaper"
        className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
      />
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Generate
      </button>
    </div>
  );
}
