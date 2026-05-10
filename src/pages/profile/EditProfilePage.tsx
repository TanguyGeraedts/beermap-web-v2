import {useNavigate} from 'react-router-dom';
import {useMe} from "@/hooks/useMe.ts";
import {Button} from "@/components/ui";
import {EditProfile} from "@/components/profile/EditProfile.tsx";
import {ChevronLeft} from 'lucide-react';

export const EditProfilePage = () => {
    const {isLoading} = useMe();
    const navigate = useNavigate();

    if (isLoading) {
        return <main className="grid min-h-dvh place-items-center p-6 text-(--color-muted)">Loading...</main>;
    }


    return (
        <main className="min-h-dvh p-6">
            <div className="max-w-md mx-auto space-y-6">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/profile')}
                        className="gap-2 px-0 hover:bg-transparent"
                    >
                        <ChevronLeft size={20}/>
                        Back to Profile
                    </Button>
                </div>

                <EditProfile/>
            </div>
        </main>
    );
};