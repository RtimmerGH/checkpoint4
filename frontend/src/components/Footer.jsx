import { GoMarkGithub } from "react-icons/go";

export default function Footer() {
  return (
    <footer className="bg-red-600 fixed bottom-0 w-[100vw] h-[10vh] border-t-2 border-black">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8 ">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="https://github.com/RtimmerGH"
            className="text-blue-800 hover:text-gray-500"
          >
            <GoMarkGithub className="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
        <div className="mt-2 md:mt-0 md:order-1">
          <p className="text-center text-base text-blue-800">
            &copy; 2023 Wild Code School, Checkpoint4.
          </p>
        </div>
      </div>
    </footer>
  );
}
