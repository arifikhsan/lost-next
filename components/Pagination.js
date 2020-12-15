import Link from "next/link";

export default function Pagination({ pagination }) {
  console.log(pagination);
  const prevLink = () => {
    if (pagination.is_first_page) {
      return "/item";
    } else if (pagination.prev_page) {
      return `/item?page=${pagination.prev_page}&per=10`;
    } else {
      return "/item";
    }
  };

  const nextLink = () => {
    if (pagination.is_last_page) {
      return "/item";
    } else if (pagination.next_page) {
      return `/item?page=${pagination.next_page}&per=10`;
    } else {
      return "/item";
    }
  };

  return (
    <div className="flex flex-col items-center justify-between py-4 space-y-4 bg-white border-t border-gray-200 sm:px-6">
      <div className="flex justify-start w-full">
        <p className="inline-flex flex-wrap justify-center w-full space-x-1 text-sm text-gray-700">
          <span>Menampilkan</span>
          <span className="font-semibold">{pagination.from}</span>
          <span>sampai</span>
          <span className="font-semibold">{pagination.to}</span>
          <span>dari</span>
          <span className="font-semibold">{pagination.total_count}</span>
          <span>laporan</span>
        </p>
      </div>
      <div className="flex justify-between w-full sm:hidden">
        {pagination.is_first_page ? (
          <p></p>
        ) : (
          <Link href={prevLink()}>
            <a className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition duration-500 bg-white border border-gray-300 rounded-md hover:text-gray-500">
              Sebelumnya
            </a>
          </Link>
        )}
        {pagination.is_last_page || pagination.size === 0 ? (
          <p></p>
        ) : (
          <Link href={nextLink()}>
            <a className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 transition duration-500 bg-white border border-gray-300 rounded-md hover:text-gray-500">
              Selanjutnya
            </a>
          </Link>
        )}
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            >
              2
            </a>
            <a
              href="#"
              className="relative items-center hidden px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 md:inline-flex hover:bg-gray-50"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
              ...
            </span>
            <a
              href="#"
              className="relative items-center hidden px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 md:inline-flex hover:bg-gray-50"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
