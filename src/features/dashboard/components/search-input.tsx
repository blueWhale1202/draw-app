"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

import qs from "query-string";

import { useDebounceValue } from "usehooks-ts";

export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [debounceValue, setDebounceValue] = useDebounceValue("", 500);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setDebounceValue(e.target.value);
    };

    useEffect(() => {
        const url = qs.stringifyUrl(
            {
                url: "/",
                query: {
                    search: debounceValue,
                },
            },
            { skipEmptyString: true, skipNull: true },
        );

        router.push(url);
    }, [router, debounceValue]);

    return (
        <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
                className="w-full max-w-[516px] pl-9"
                placeholder="Search boards"
                onChange={onChange}
            />
        </div>
    );
};
