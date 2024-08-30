"use client";

import { API } from "@/lib/services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import NavBar from '@/components/NavBar'
import Image from "next/image";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";
import { CommentForm } from "@/components/Forms/CommentsForm";
import Comment from "postcss/lib/comment";



export default function Game({ searchParams }: { searchParams: { gameid: string } }) {

        const GameId: string = searchParams.gameid;

        const [game, setGame] = useState<any>({}); // Inicializar como null para manejar el estado de carga

        const url: string = 'games/' + GameId;

        const getGames = async () => {
            try {
                const res = await API.get(url);
                console.log("respuesta", res.data.data);
                setGame(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        useEffect(() => {
            getGames();
        }, []);

        if (!game) {
            return <p>Loading...</p>; // Mostrar un mensaje de carga mientras se obtiene la data
        }

        return (
            <>
                <NavBar />
                <main className="flex flex-col items-center  min-h-screen bg-gray-100 dark:bg-gray-900 gap-20">
                    <div className="m-32" >
                        <Card className="flex flex-row items-center justify-center  gap-10 p-5" >

                            <div className="flex flex-row items-center justify-center  gap-10 p-5">
                                <Image
                                    src={game.cover}
                                    height={300}
                                    width={300}
                                    alt="Vegetta777 youtube logo"
                                    priority />

                            </div>
                            <div className="flex flex-col justify-center items-center gap-10" >
                                <CardTitle className="text-3xl font-bold">{game.name}</CardTitle>
                                <CardTitle className="text-3xl font-bold">{game.genre}</CardTitle>
      
                                <span className="text-3xl font-bold">{game.votes} votos</span>
                            </div>
                            <p> </p>
                        </Card>
                    </div >
                    <div className="flex flex-col">



                            <CommentForm  GameId = {game._id} Game= {game} ></CommentForm>






                


                    </div>

                </main >
            </>
        );
    }
