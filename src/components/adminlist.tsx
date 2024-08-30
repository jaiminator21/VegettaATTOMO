'use client';

import Image from "next/image";
import {
    CardTitle,
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
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { API } from "@/lib/services/api";

export function AdminList({ game }: { game: any }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedGame, setEditedGame] = useState({
        cover: game.cover,
        name: game.name,
        genre: game.genre,
        votes: game.votes,
        comments: game.comments
    });
    const [previewImage, setPreviewImage] = useState<string>(game.cover); 

    useEffect(()=>{
        console.log("Juego editado",editedGame);
    },[editedGame])


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedGame({
            ...editedGame,
            [e.target.name]: e.target.value,
        });
    };



    const UpdateGame = async () => {
        const token = localStorage.getItem('Token');
        if (!token) return;
        console.log("Se envia", editedGame);
        try {
            const res = await API.put(
                `games/${game._id}`,
                editedGame, 
                { headers: { Authorization: `Bearer ${token}` } }
            ).then((res) => {
                console.log(res);
                console.log("Juego actualizado con nuevo comentario:", res.data);
            })
        } catch (error) {
            console.error("Error al actualizar el juego:", error);
        }
    };
    

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string); 
            };
            reader.readAsDataURL(file);

            setEditedGame({
                ...editedGame,
                cover: file, 
            });
        }
    };


    const StartEdit = () =>{
        setIsEditing(true)
    }

    const FinishEdit = () =>{
        UpdateGame()
        setIsEditing(false)
    }

    const deleteGame = async () => {
        const token = localStorage.getItem('Token');
        const url: string = 'games/' + game._id;
        try {
            const res = await API.delete(url   ,{ headers: { Authorization: `Bearer ${token}` } });
            console.log("respuesta", res);
      
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="mb-5">
            <Card className="flex flex-row items-center justify-center gap-10 p-5">
                    <div className="flex flex-row items-center justify-center gap-10 p-5">
                        {isEditing ? (
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="border p-1"
                                />
                                {previewImage && (
                                    <Image
                                        src={previewImage}
                                        height={50}
                                        width={50}
                                        alt="Vista previa de la imagen"
                                        priority
                                    />
                                )}
                            </>
                        ) : (
                            <Image
                                src={game.cover}
                                height={50}
                                width={50}
                                alt="Game cover"
                                priority
                            />
                        )}
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={editedGame.name}
                                onChange={handleInputChange}
                                className="text-3xl font-bold border p-1"
                            />
                        ) : (
                            <CardTitle className="text-3xl font-bold">{game.name}</CardTitle>
                        )}
                        {isEditing ? (
                            <input
                                type="text"
                                name="genre"
                                value={editedGame.genre}
                                onChange={handleInputChange}
                                className="text-3xl font-bold border p-1"
                            />
                        ) : (
                            <CardTitle className="text-3xl font-bold">{game.genre}</CardTitle>
                        )}
                    </div>
                <div className="flex flex-col justify-center items-center">
                    {isEditing ? (
                        <input
                            type="number"
                            name="votes"
                            value={editedGame.votes}
                            onChange={handleInputChange}
                            className="border p-1"
                        />
                    ) : (
                        <span>{game.votes}</span>
                    )}
                </div>
                <div className="flex gap-4">
                    {isEditing ? (
                        <Button onClick={FinishEdit}>Guardar</Button>
                    ) : (
                        <Button onClick={StartEdit}>Editar</Button>
                    )}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline">Votar</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Seguro que quieres votar a {game.name}?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Esto votará por este juego.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={deleteGame}>Confirmar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </Card>
        </div>
    );
}
