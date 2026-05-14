export interface MetaResponse {
    version: string;
}

export interface ChangelogEntry {
    version: string;
    date: string;
    changes: string[];
}

export interface ChangelogResponse {
    entries: ChangelogEntry[];
}