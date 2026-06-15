export type DraftStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface DraftLogResponse {
    id: string;
    userId: string;
    capturedAt: string;
    photoUrl: string;
    status: DraftStatus;
    createdAt: string;
    updatedAt: string;
}

export interface CreateDraftLogRequest {
    photoUrl: string;
    capturedAt: string;
    latitude: number | null;
    longitude: number | null;
}

