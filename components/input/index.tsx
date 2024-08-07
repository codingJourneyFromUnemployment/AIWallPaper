export default function Input() {
  return (
    <div className="w-11/12 md:w-3/4 md:max-w-7xl flex flex-col items-center space-y-6 md:flex-row md:space-x-6">
      <label htmlFor="prompt" className="sr-only">
        Email
      </label>
      <input
        id="prompt"
        name="prompt"
        type="text"
        placeholder="Input your prompt for a new wallpaper"
        className="w-full rounded-md border-solid border border-primary/40 bg-background py-1.5 text-foreground shadow-md placeholder:text-muted-foreground focus:outline-none focus:border-primary sm:text-sm sm:leading-6 pl-4"
      />
      <button
        type="button"
        className="w-24 rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:bg-primary/60"
      >
        Generate
      </button>
    </div>
  );
}
