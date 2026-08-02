import { deleteCookie } from "@/services/auth/tokenHandlers";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { redirect } from "next/navigation";

const ProfileDropdownMenu = () => {
    const handleLogout = () => {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        redirect('/');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold text-sm">
                    JD
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileDropdownMenu;