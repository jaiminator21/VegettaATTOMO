"use client";

import Image from "next/image";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { FaHeart } from "react-icons/fa";
import { Separator, } from "@/components/ui/separator";

import Link from "next/link";
import { API } from "@/lib/services/api";
import { useEffect, useState } from "react";
import { validateHeaderName } from "http";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button"
export function GameList({ game }: { game: any }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [votesArray, setVotesArray] = useState<any[]>([]);

    useEffect(() => {
        validateToken();
    }, []);

    const validateToken = async () => {
        const token = localStorage.getItem('Token');
        if (token == null) {
            console.log('Token Vacio');
            setIsAuthenticated(false);
            return false;
        }
        try {
            const res = await API.get('users/checksession', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Respuesta:', res.data);
    
            setIsAuthenticated(true);
            setVotesArray(res.data.votes);
    

/*             setVotesArray((updatedVotesArray) => {return updatedVotesArray;});*/
        } catch (error) {
            console.error('Error en la petición:', error);
            setIsAuthenticated(false);
            return false;
        }
    }

    const checkVotes = (gameId: any) => {
        console.log("Comprobando duplicados de", gameId);
    
        if (!votesArray.includes(gameId)) {
            console.log("Continuando con el proceso");
    
            // Actualización del estado con el nuevo array que incluye el nuevo gameId
            setVotesArray(prevVotesArray => [...prevVotesArray, gameId]);
    
            // Llamada a la función sendVote (suponiendo que esta función maneja el envío del voto)
            sendVote();
        } else {
            console.log(votesArray);
            console.log("No se puede votar", votesArray.length);
            return false;
        }
    };
    
    
    const sendVote = () => {
        const newVote = game.votes + 1;
        const url = 'games/' + game._id;
    
        try {
            API.put(url, {
                votes: newVote,
            }).then((res) => {
                console.log("Voto enviado!", votesArray.length);
                registerVote();
            });
        } catch (error) {
            console.log(error);   
        }
    }
    
    
    const removeVote = () => {
        const newVote = game.votes -1;
        const url = 'games/' + game._id;
    
        try {
            API.put(url, {
                votes: newVote,
            }).then((res) => {
                console.log("Voto cancelado!", votesArray.length);
            });
        } catch (error) {
            console.log(error);   
        }
    }
    

    const registerVote = () => {
        const token: any = localStorage.getItem("Token");
        if (!token) return false;
        const decoded: any = jwtDecode(token);
        const url = `users/${decoded.id}`;
        try {
          // Verifica que votesArray contenga los datos correctos
  
          console.log("Payload enviado:", votesArray);
      
          API.put(url, { votes: votesArray })
            .then((res) => {
              console.log("Respuesta de la API:", res);
            })
            .catch((error) => {
              console.error("Error al enviar la petición:", error);
            });
        } catch (error) {
          console.error("Error en la lógica:", error);
        }
      };

      const cancelVote = () => {
        if (isAuthenticated === true) {
            console.log("Puedes Votar");
            removeVote();
        } else {
            return false
        }

    }

    const submitVote = () => {
        if (isAuthenticated === true) {
            console.log("Puedes Votar");
            checkVotes(game._id);
        } else {
            return false
        }

    }

    return (
        <>
            <div className="mb-5" >
                <Card className="flex flex-row items-center justify-center  gap-10 p-5" >
                    <Link href={{
                        pathname: "/game",
                        query: {
                            gameid: game._id
                        }
                    }}>
                        <div className="flex flex-row items-center justify-center  gap-10 p-5">
                            <Image
                                src={game.cover}
                                height={50}
                                width={50}
                                alt="Vegetta777 youtube logo"
                                priority />

                            <Separator orientation="vertical" />

                            <CardTitle className="text-3xl font-bold">{game.name}</CardTitle>

                            <Separator orientation="vertical" />

                            <CardTitle className="text-3xl font-bold">{game.genre}</CardTitle>
                        </div>
                    </Link>
                    <Separator orientation="vertical" />
                    <div className="flex flex-col justify-center items-center" >
                        <AlertDialog >
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" onClick={submitVote}>Votar</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Seguro que quieres votar a {game.name}?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={cancelVote}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={registerVote}>Confirmar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <span>{game.votes}</span>
                    </div>
                    <p> </p>
                </Card>



            </div >
        </>
    );
}