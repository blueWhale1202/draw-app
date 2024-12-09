import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function AppPage() {
    return (
        <div>
            <Button>Click</Button>
            <UserButton />
        </div>
    );
}
