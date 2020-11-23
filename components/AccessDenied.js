import { signIn } from "next-auth/client";

export default function AccessDenied() {
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-xl font-bold text-red-500 font-display">
        Access Denied
      </h1>
      <p>Silahkan login dulu 😇😆</p>
      <div>
        <button
          className="px-4 py-2 text-sm text-white rounded bg-accent"
          onClick={(e) => {
            e.preventDefault();
            signIn("google");
          }}
        >
          Login dengan akun google
        </button>
      </div>
    </div>
  );
}
