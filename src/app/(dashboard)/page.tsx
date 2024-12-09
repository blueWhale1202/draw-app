import { OrganizationSwitcher } from "@clerk/nextjs";

export default function AppPage() {
    return (
        <div>
            <OrganizationSwitcher
                appearance={{
                    elements: {
                        avatarBox: "size-8 bg-transparent",
                    },
                }}
            />
            <p className=""></p>
        </div>
    );
}
