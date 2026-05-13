import { Card } from "@/components/ui";
import {useState} from "react";
import {Rating} from "@/components/ui/components/Rating.tsx";


export const RatingDisplay = () => {
    const [userRating, setUserRating] = useState(7);

    return (
        <section className="space-y-6 p-6">
            <Card>
                <Card.Header>Rate your experience</Card.Header>
                <Card.Body className="space-y-2">
                    <Rating
                        interactive
                        value={userRating}
                        onChange={setUserRating}
                    />
                    <p className="text-sm text-gray-500">
                        Current Value: {userRating} ({userRating / 2} stars)
                    </p>
                </Card.Body>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <Card.Body>
                        <h3 className="text-sm font-medium mb-2">Average Rating (Big)</h3>
                        <Rating value={7} size="lg" />
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <h3 className="text-sm font-medium mb-2">Compact (Small)</h3>
                        <Rating value={7} size="sm" />
                    </Card.Body>
                </Card>
            </div>
        </section>
    );
};