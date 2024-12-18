import Image from "next/image";
import Link from "next/link";

import { Overlay } from "./overlay";

import { Actions } from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { CardFooter } from "./card-footer";

type Props = {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    imageUrl: string;
    orgId: string;
    createdAt: number;
    isFavorite: boolean;
};

export const BoardCard = ({
    id,
    title,
    authorName,
    authorId,
    imageUrl,
    orgId,
    createdAt,
    isFavorite,
}: Props) => {
    const { userId } = useAuth();

    const authorLabel = authorId === userId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

    return (
        <Link href={`/board/${id}`}>
            <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border">
                <div className="relative flex-1 bg-amber-50">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-contain"
                    />
                    <Overlay />
                    <Actions id={id} title={title} side="right">
                        <button className="absolute right-1 top-1 px-3 py-2 opacity-0 outline-none transition-opacity group-hover:opacity-100">
                            <MoreHorizontal className="text-white opacity-75 transition-opacity hover:opacity-100" />
                        </button>
                    </Actions>
                </div>
                <CardFooter
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    disabled={false}
                    onClick={() => {}}
                />
            </div>
        </Link>
    );
};

export const BoardCardSkeleton = () => {
    return (
        <div className="aspect-[100/127] overflow-hidden rounded-lg">
            <Skeleton className="size-full" />
        </div>
    );
};
