"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { registerUserAction } from "@/lib/auth-actions";
import {API} from '@/lib/services/api'
import { useRouter } from 'next/navigation';
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
import { ZodErrors } from "@/components/ZodErrors";


export function SignupForm() {

  const router = useRouter()
  const HandleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e);
    
    const data = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value
    }
    console.log("Esto es data",data)
    API.post('users/register', data).then(response =>router.push('/login'));
  }

  return (
    <div className="w-full max-w-md">
      <form  onSubmit={HandleSubmit}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
              />
              
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
            
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Contraseñ: Ejemplo123!"
              />
 
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="w-full" type="submit">Sign Up</button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="login">
            Sing In
          </Link>
        </div>
      </form>
    </div>
  );
}