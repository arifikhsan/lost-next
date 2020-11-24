import Link from "next/link";
import Router from "next/router";

export default function ServerSleeping() {
  return (
    <div className="flex flex-col items-start mt-6 space-y-6">
      <h1 className="text-3xl font-bold text-red-500 font-display">
        Sssstt... server sedang tertidur 😴😴
      </h1>
      <p>Silahkan tunggu beberapa saat lagi sampai ia bangun 😇😇😇</p>
      <div>
        <button
          onClick={() => {
            Router.reload(window.location.pathname);
          }}
          className="px-4 py-2 text-sm text-white rounded bg-primary"
        >
          Muat ulang halaman
        </button>
      </div>
    </div>
  );
}
