import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import network from "utils/network";
import { getSession } from "next-auth/client";
import { Field, Form, Formik } from "formik";
import networkClient from "utils/network-client";

function UserForm({ user, submit }) {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ name: user.name, email: user.email }}
      onSubmit={(values) => {
        submit(values);
      }}
    >
      {({ values, handleSubmit }) => {
        return (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-col mt-6 space-y-4">
              <div>
                <label className="text-gray-700">Email</label>
                <Field
                  name="email"
                  className="block mt-1 bg-gray-200 form-input"
                  placeholder="Email"
                  disabled
                />
              </div>
              <div>
                <label className="text-gray-700">Nama</label>
                <Field
                  name="name"
                  className="block mt-1 form-input"
                  placeholder="Nama lengkap"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white rounded bg-primary"
                >
                  Update akun
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

function UserDetailForm({ userDetail, submit }) {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        phoneNumber: userDetail.phone_number || "",
        whatsappPhoneNumber: userDetail.whatsapp_phone_number || "",
      }}
      onSubmit={(values) => {
        submit(values);
      }}
    >
      {({ values, handleSubmit }) => {
        return (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-col mt-6 space-y-4">
              <div>
                <label className="text-gray-700">Nomor HP</label>
                <Field
                  name="phoneNumber"
                  className="block mt-1 form-input"
                  placeholder="Nomor HP aktif"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700">Nomor WhatsApp</label>
                <Field
                  name="whatsappPhoneNumber"
                  className="block mt-1 form-input"
                  placeholder="Nomor Whatsapp aktif"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white rounded bg-primary"
                >
                  Update informasi pengguna
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

function AccountSetting({ user, userDetail, authHeaders }) {
  const submitUser = async (values) => {
    const requestBody = {
      user: {
        name: values.name,
      },
    };

    const response = await networkClient.put("/users", requestBody, {
      headers: authHeaders,
    });

    if (response.status == 204) {
      alert("Berhasil update akun");
    } else {
      alert("Gagal update akun");
    }
  };

  const submitUserDetail = async (values) => {
    const requestBody = {
      user_detail: {
        phone_number: values.phoneNumber,
        whatsapp_phone_number: values.whatsappPhoneNumber,
      },
    };

    const response = await networkClient.put("/user_details", requestBody, {
      headers: authHeaders,
    });

    if (response.status == 204) {
      alert("Berhasil update informasi pengguna");
    } else {
      alert("Gagal update informasi pengguna");
    }
  };

  return (
    <Layout>
      <SEO title="Pengaturan akun" description="Pengaturan akun" />
      <div className="grid gap-6">
        <h1 className="py-6 text-3xl font-bold font-display">
          Pengaturan akun
        </h1>
        <div className="">
          <h3 className="text-xl font-semibold font-display">Informasi Akun</h3>
          <UserForm user={user} submit={submitUser} />
        </div>
        <div className="">
          <h3 className="text-xl font-semibold font-display">
            Informasi Pengguna
          </h3>
          <UserDetailForm userDetail={userDetail} submit={submitUserDetail} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let token = null;
  let userDetail = null;
  let user = null;
  let authHeaders = null;

  if (session) {
    const options = { headers: { cookie: context.req.headers.cookie } };
    const resToken = await network.get(
      `${process.env.NEXTAUTH_URL}/api/examples/jwt`,
      options
    );
    token = resToken.data;

    authHeaders = {
      "access-token": token["access-token"],
      client: token["client"],
      uid: token["uid"],
    };
    const res = await network.get(`/user_details`, { headers: authHeaders });

    if (res.data) {
      userDetail = res.data.user_detail;
      user = res.data.user;
    }
  }

  return { props: { user, userDetail, authHeaders } };
}

export default AccountSetting;
