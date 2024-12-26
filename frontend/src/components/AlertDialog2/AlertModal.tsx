import React from "react";
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

type AlertModalProps = {
    title: string;
    description: string;
    trigger: React.ReactNode;
    onConfirm: () => void;
};

export default function AlertModal({ title, description, trigger, onConfirm }: AlertModalProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="border-Red text-Red hover:bg-Red hover:text-white">Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className="bg-DarkGreen hover:bg-DarkGreen_Hover">Xác nhận</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}