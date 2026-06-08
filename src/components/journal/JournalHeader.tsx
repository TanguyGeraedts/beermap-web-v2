import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui";

interface JournalHeaderProps {
    date: string | undefined;
    formattedDate: string;
}

export const JournalHeader = ({ date, formattedDate }: JournalHeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    className="p-2! rounded-xl"
                    onClick={() => navigate('/journal')}
                >
                    <ArrowLeft size={16} />
                </Button>
                <h1 className="text-xl font-bold text-(--color-text)">
                    {formattedDate}
                </h1>
            </div>

            <Button
                variant="primary"
                size="sm"
                className="gap-1 rounded-xl"
                onClick={() => navigate(`/log?date=${date}`)}
            >
                <Plus size={14} />
                Add Drink
            </Button>
        </div>
    );
};