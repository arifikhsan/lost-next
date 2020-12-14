import { Field, Form, Formik } from "formik";
import { searchItems } from "repository/item-repository";

function SearchItemForm({ updateItems }) {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={async (values) => {
        const res = await searchItems(values.query);
        updateItems(res);
      }}
    >
      {({ handleSubmit }) => {
        return (
          <Form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex items-center justify-between space-x-2">
              <Field
                name="query"
                className="w-full p-2 text-sm border rounded-md focus:outline-none"
                placeholder="Cari barang hilang/temuan..."
                required
              />
              <button
                type="submit"
                className="p-2 rounded-md bg-primary text-secondary"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SearchItemForm;