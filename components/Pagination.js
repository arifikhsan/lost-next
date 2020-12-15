import { range } from "lodash";
import Link from "next/link";

export default function Pagination({ pagination, searchQuery }) {
  let url = "/item";
  let params = { per: 10 };

  if (searchQuery) {
    params.query = searchQuery;
  }

  const prevLink = () => {
    if (pagination.is_first_page) {
      return url;
    } else if (pagination.prev_page) {
      params.page = pagination.prev_page;
      const queryParam = new URLSearchParams(params);
      return `${url}?${queryParam}`;
    } else {
      return url;
    }
  };

  const nextLink = () => {
    if (pagination.is_last_page) {
      return url;
    } else if (pagination.next_page) {
      params.page = pagination.next_page;
      const queryParam = new URLSearchParams(params);
      return `${url}?${queryParam}`;
    } else {
      return url;
    }
  };

  const pageRange = () => {
    if (pagination.total_pages == 1) {
      return range(1, 2);
    } else if (pagination.total_pages < 5) {
      return range(1, pagination.total_pages + 1);
    } else if (
      pagination.current_page == 1 &&
      pagination.current_page + 4 <= 5
    ) {
      return range(1, 5 + 1);
    } else if (pagination.total_pages == 5) {
      return range(1, pagination.total_pages + 1);
    } else if (pagination.current_page - 2 == 0) {
      return range(1, pagination.current_page + 3 + 1);
    } else if (
      pagination.current_page - 2 > 0 &&
      pagination.current_page + 2 <= pagination.total_pages
    ) {
      return range(
        pagination.current_page - 2,
        pagination.current_page + 2 + 1
      );
    } else {
      return range(pagination.total_pages - 4, pagination.total_pages + 1);
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
      {pagination.size > 0 && (
        <>
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
                {pagination.is_first_page ? (
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 opacity-50 rounded-l-md hover:bg-gray-50"
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
                ) : (
                  <Link href={prevLink()}>
                    <a className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
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
                  </Link>
                )}

                {pageRange().map((pageNumber) => {
                  params.page = pageNumber;
                  const queryParam = new URLSearchParams(params);

                  return (
                    <Link href={`${url}?${queryParam.toString()}`} key={pageNumber}>
                      <a
                        className={
                          `relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50 ` +
                          (pagination.current_page == pageNumber
                            ? `text-secondary bg-primary`
                            : `text-gray-700 bg-white`)
                        }
                      >
                        {pageNumber}
                      </a>
                    </Link>
                  );
                })}

                {pagination.is_last_page || pagination.size === 0 ? (
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 opacity-50 rounded-r-md hover:bg-gray-50"
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
                ) : (
                  <Link href={nextLink()}>
                    <a className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
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
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
