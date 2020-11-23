import { concat, difference, intersection, isEmpty, union } from "lodash";
import { Component } from "react";

const { Formik, Form, Field } = require("formik");

class ItemForm extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   formCategory: [],
    // };
  }

  render() {
    const { submitItem, categories, item, isEdit } = this.props;
    // const { formCategory } = this.state;

    return (
      <div>
        <Formik
          enableReinitialize
          initialValues={{ item }}
          onSubmit={(values) => {
            const dateNow = new Date();
            const nextYear = dateNow.setFullYear(dateNow.getFullYear() + 1);

            item.title = values.item.title;
            item.detail = values.item.detail;
            item.condition = values.item.condition;

            if (!isEdit) {
              item.time_start = new Date().toISOString();
              item.time_end = new Date(nextYear).toISOString();
            }

            // console.log(values.item.category)
            // console.log("item.category_ids: ", item.category_ids);
            // console.log("values.item.category_ids: ", values.item.category_ids);
            // console.log('item.category_items: ', item.category_items)

            item.category_items_attributes = [];

            if (isEdit) {
              let new_category_item = [];

              const diff = difference(
                values.item.category_ids,
                item.category_ids
              );

              // jika ada yang berbeda, ditambahkan
              if (diff) {
                diff.map((category_id) => {
                  new_category_item.push({
                    category_id: parseInt(category_id),
                  });
                });
              }

              // jika sama, masukkan juga dengan id
              const notChange = intersection(
                values.item.category_ids,
                item.category_ids
              );

              if (notChange) {
                notChange.map((category_id) => {
                  let added = {};
                  item.category_items.map((ci) => {
                    if (parseInt(category_id) === ci.category_id) {
                      added = ci;
                    }
                  });
                  new_category_item.push(added);
                });
              }

              // jika category ada yang kurang, delete
              item.category_items.map((ci) => {
                if (
                  !values.item.category_ids.includes(String(ci.category_id))
                ) {
                  new_category_item.push({ _destroy: true, ...ci });
                }
              });

              item.category_items_attributes = new_category_item;
            } else {
              // jika ada kategori baru
              if (!isEmpty(values.item.category_ids)) {
                values.item.category_ids.map((category_id) => {
                  let category_item = {
                    category_id: parseInt(category_id),
                  };
                  item.category_items_attributes.push(category_item);
                });
              }
            }

            // console.log(
            //   "item.category_items_attributes: ",
            //   item.category_items_attributes
            // );

            submitItem();
          }}
        >
          {({ values, handleSubmit }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-4">
                  <h3 className="text-xl font-semibold font-display">
                    Kondisi
                  </h3>
                  <div className="text-gray-700">Hilang / Ditemukan</div>
                  <div className="flex mt-2 space-x-4">
                    <label className="inline-flex items-center">
                      <Field
                        className="form-radio"
                        type="radio"
                        name="item.condition"
                        value="lost"
                        required
                      />
                      <span className="ml-2">Hilang</span>
                    </label>
                    <label className="inline-flex items-center">
                      <Field
                        className="form-radio"
                        type="radio"
                        name="item.condition"
                        value="found"
                      />
                      <span className="ml-2">Ditemukan</span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <h3 className="text-xl font-semibold font-display">
                    Detail Barang
                  </h3>
                  <div>
                    <label className="text-gray-700">Judul</label>
                    <Field
                      name="item.title"
                      className="block w-full mt-1 form-input"
                      placeholder="Telah hilang/ditemukan..."
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-700">Deskripsi</label>
                    <Field
                      component="textarea"
                      name="item.detail"
                      className="block w-full mt-1 form-textarea"
                      rows="12"
                      placeholder="Ceritakan waktu, tempat, serta hal lain yang mendukung"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <h3 className="text-xl font-semibold font-display">
                    Kategori Barang
                  </h3>
                  <span>Pilih kategori yang relevan</span>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="inline-flex items-center"
                      >
                        <Field
                          type="checkbox"
                          name="item.category_ids"
                          value={`${category.id}`}
                          className="form-checkbox"
                        />
                        <span className="ml-2 text-gray-800">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <h3 className="text-xl font-semibold font-display">
                    Kirim laporan
                  </h3>
                  <div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm text-white rounded bg-primary"
                    >
                      {isEdit ? "Update laporan" : "Buat laporan baru"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default ItemForm;
