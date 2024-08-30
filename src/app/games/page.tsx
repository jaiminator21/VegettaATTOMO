"use client";

import styles from "./page.module.css";
import NavBar from '@/components/NavBar'
import { GameList } from "@/components/gamelist";
import { useEffect, useState } from "react";
import { API } from "@/lib/services/api";
import { json } from "stream/consumers";


export default function Home() {


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

    useEffect(() => {
        getGames();
    }, []);

    return (
        <>
            <NavBar />
            <main className="flex flex-col items-center  min-h-screen bg-gray-100 dark:bg-gray-900 gap-20">
                <div className="m-32">
                    <h1>Vota tu juego favorito</h1>
                </div>
                <div >
                        {gamesArray.length > 0 ? (
                            gamesArray.map((game, index) => (
                                <div className="gap-10">
                                    < GameList key = {index} game = {game}/>
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
