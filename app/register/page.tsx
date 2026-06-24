"use client"

import { useActionState } from "react"
import {
  registerUser,
  type RegisterState,
} from "@/app/actions/users"

const initialState: RegisterState = {
  errors: {},
  values: { username: "", name: "" },
  success: false,
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            defaultValue={state.values?.username}
            className="w-full border rounded px-3 py-2"
          />
          {state.errors.username && (
            <p className="text-red-600 text-sm mt-1">
              {state.errors.username}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            defaultValue={state.values?.name}
            className="w-full border rounded px-3 py-2"
          />
          {state.errors.name && (
            <p className="text-red-600 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="w-full border rounded px-3 py-2"
          />
          {state.errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {state.errors.password}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="passwordConfirm" className="block mb-1 font-medium">
            Confirm password
          </label>
          <input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            className="w-full border rounded px-3 py-2"
          />
          {state.errors.passwordConfirm && (
            <p className="text-red-600 text-sm mt-1">
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  )
}
