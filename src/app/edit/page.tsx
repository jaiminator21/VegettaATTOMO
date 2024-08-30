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
export default function Edit() {
    const router = useRouter();
    useEffect(()=>{
        //checkAdmin();
        getGames();
    },[])


    const [gamesArray, setGamesArray] = useState<any[]>([]);

    const getGames = async () => {
        try {
            const res = await API.get('games');
            //console.log(res);
            if (res.data.length > 0) {
                // Almacenar los datos en el estado
                setGamesArray(res.data);
                //console.log(gamesArray); // Esto puede mostrar el valor anterior debido a la asincronía del estado
            } else {
                console.log('array vacio');
            }
        } catch (error) {
            console.log(error);
        }
    };



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


  return (

    <>
            <NavBar />
            <main className="flex flex-col items-center  min-h-screen bg-gray-100 dark:bg-gray-900 gap-20">
                <div className="m-32">
                    <h1>Bienvenido al panel de admistrador</h1>
                </div>

                <Link href={'/creategame'}>
                    <Button>Button</Button>
                </Link>
                

                <div >
                        {gamesArray.length > 0 ? (
                            gamesArray.map((game, index) => (
                                <div className="gap-10">
                                    <AdminList key = {index} game = {game}/>
                                </div>
                            ))
                        ) : (
                            <p>No hay juegos disponibles.</p>
                        )}
                </div>
            </main>
  </>
  );
}
