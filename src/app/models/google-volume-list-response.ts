/**
 * Interface décrivant la réponse de l'API google book
 */
export interface GoogleVolumeListResponse {
    totalItems: number;
    items: Array<{
        volumeInfo: {
            title: string;
            subtitle: string;
            authors: string;
            description: string;
        }
    }>;
}