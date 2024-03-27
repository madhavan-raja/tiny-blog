"use client";

import { redirect } from 'next/navigation'
import { useCookies } from 'next-client-cookies';

export default function Logout() {
  try {
    const cookies = useCookies();
    cookies.remove('token');
  }
  catch (err) {
    console.log("Error:", err)
  }

  redirect(`/login`)
}
