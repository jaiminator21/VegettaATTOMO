"use client";

import Link from "next/link";
import { FormEvent } from 'react'
import { API } from '@/lib/services/api'
import { JWT_DECODER } from '@/lib/services/jwtDecoder'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";


import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function gameForm() {

  const router = useRouter()
  const handleSubmit = (e: any) => {
    e.preventDefault();

console.log(e);

    const data = {
      email: e.target[0].value,
      password: e.target[1].value
    }
    API.post('users/login', data).then(response => {
      if (response.status !== 200) {
        console.log("error en el login");
        return false;
      }



    });
  }


  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="admin@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Ejemplo123!"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="w-full" type="submit">Sign In</button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline ml-2" href="register">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}