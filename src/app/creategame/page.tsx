"use client"
import Image from "next/image";
import styles from "./page.module.css";
import NavBar from '@/components/NavBar'
import { useEffect, useState } from "react";
import { API } from "@/lib/services/api";
import { useRouter } from 'next/navigation';
import { AdminList } from "@/components/adminlist";
import { Button } from "@/components/ui/button"
import Link from 'next/link'
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

export default function CreateGame() {

    useEffect(()=>{
      //  checkAdmin();
    },[])

    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const checkAdmin = async () => {
        const token = localStorage.getItem('Token');
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        try {
            const res = await API.get('users/checkadmin', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(res);
            sessionStorage.setItem("UserId", res.data._id);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error en la validación del token:', error);
            setIsAuthenticated(false);
            console.log("FUERA");
            router.push('/login');
        }
    };


    const sendGame = async (formData: FormData) => {
        try {
          const res = await API.post("/games", formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Asegúrate de especificar que el contenido es multipart/form-data
            },
          });
          console.log(res);
        } catch (error) {
          console.error("Error al crear el juego:", error);
        }
      };
    
      const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        // Crear un FormData y agregar los campos del formulario
        const formData = new FormData();
        formData.append("name", e.target[0].value);
        formData.append("genre", e.target[1].value);
    
        // Asegurarse de que el archivo sea agregado correctamente
        if (e.target[2].files.length > 0) {
          formData.append("cover", e.target[2].files[0]);
        }
    
        // Enviar el FormData
        await sendGame(formData);
      };

    return (
        <>
            <NavBar />
            <main className="flex flex-col items-center  min-h-screen bg-gray-100 dark:bg-gray-900 gap-20">
                <div className="mt-32">
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-3xl font-bold">Publica un juego</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Sonic"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Genre</Label>
                                    <Input
                                        id="genre"
                                        name="genre"
                                        type="text"
                                        placeholder="Carreras"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Portada</Label>
                                    <Input
                                        id="cover"
                                        name="cover"
                                        type="file"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col">
                                <button className="w-full" type="submit">Create</button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </main >
        </>
    );
};
