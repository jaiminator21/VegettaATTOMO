"use client";

import { useState, FormEvent, useEffect } from "react";
import { API } from '@/lib/services/api';
import { Textarea } from "@/components/ui/textarea";
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";

interface GameObject {
    comments: string[];
    cover: string;
    genre: string;
    name: string;
    updatedAt: string;
    votes: number;
    __v: number;
    _id: string;
}

interface Comment {
    _id: string;
    content: string;
    author: string;
    createdAt: string;
}

export function CommentForm({ GameId, Game }: { GameId: string, Game: GameObject }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [gameObject, setGameObject] = useState<GameObject>({
        comments: [],
        cover: "",
        genre: "",
        name: "",
        updatedAt: "",
        votes: 0,
        __v: 0,
        _id: ""
    });

    // Validación del token
    const validateToken = async () => {
        const token = localStorage.getItem('Token');
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        try {
            const res = await API.get('users/checksession', {
                headers: { Authorization: `Bearer ${token}` },
            });
            sessionStorage.setItem("UserId", res.data._id);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error en la validación del token:', error);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        console.log("Algoha cambiado", gameObject);

    }, [gameObject])
    // Enviar el comentario
    const SendPost = async (e: any) => {
        e.preventDefault();

        const content = (e.target as any)[0].value;
        const token = localStorage.getItem('Token');
        const userId = sessionStorage.getItem('UserId');

        if (!content || !token) return;

        try {
            const res = await API.post(
                'comments/',
                { content, gameId: GameId, userId },
                { headers: { Authorization: `Bearer ${token}` } }
            ).then((res) => {
                console.log("comment response", res);
                UpdateArray(res.data.data._id); // Llamamos a la función para actualizar el juego con el nuevo comentario

            })



        } catch (error) {
            console.error('Error al enviar el comentario:', error);
        }
    };
    const UpdateArray = (newCommentId: string) => {
        setGameObject(prevState => {
            // Si prevState.comments está indefinido o vacío, inicialízalo como un array vacío
            const currentComments = prevState.comments || [];
    
            // Crea una copia del array actual de comentarios y añade el nuevo comentario
            const updatedComments = [...currentComments, newCommentId];
    
            // Devuelve el nuevo estado con los comentarios actualizados
            return {
                ...prevState, // Propagamos las demás propiedades intactas
                comments: updatedComments // Actualizamos el array de comentarios
            };
        });
        UpdateGame();
    };

    // Actualizar el juego con el nuevo comentario
    const UpdateGame = async () => {
        const token = localStorage.getItem('Token');
        if (!token) return;
        console.log("Se envia", gameObject);

        try {
            // Realizamos la solicitud PUT para actualizar el objeto `gameObject` completo
            const res = await API.put(
                `games/${GameId}`,
                gameObject, // Aquí enviamos el objeto completo `gameObject`
                { headers: { Authorization: `Bearer ${token}` } }
            ).then((res) => {
                console.log(res);
                console.log("Juego actualizado con nuevo comentario:", res.data);
            })
        } catch (error) {
            console.error("Error al actualizar el juego:", error);
        }
    };


    // Manejo del submit
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setGameObject(Game)
        if (isAuthenticated) {
            SendPost(e);
        } else {
            validateToken();
        }
    };

    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold">Dejanos tu opinión</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Textarea placeholder="Escribe tu mensaje aquí." />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <button className="w-full" type="submit">Enviar</button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
